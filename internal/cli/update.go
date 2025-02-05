package cli

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"net/http"
	nativeos "os"
	"time"

	"github.com/qdm12/gluetun/internal/configuration"
	"github.com/qdm12/gluetun/internal/constants"
	"github.com/qdm12/gluetun/internal/models"
	"github.com/qdm12/gluetun/internal/storage"
	"github.com/qdm12/gluetun/internal/updater"
	"github.com/qdm12/golibs/logging"
	"github.com/qdm12/golibs/os"
)

var (
	ErrModeUnspecified         = errors.New("at least one of -enduser or -maintainers must be specified")
	ErrSyncServers             = errors.New("cannot sync hardcoded and persisted servers")
	ErrUpdateServerInformation = errors.New("cannot update server information")
	ErrWriteToFile             = errors.New("cannot write updated information to file")
)

func (c *cli) Update(ctx context.Context, args []string, os os.OS, logger logging.Logger) error {
	options := configuration.Updater{CLI: true}
	var endUserMode, maintainerMode bool
	flagSet := flag.NewFlagSet("update", flag.ExitOnError)
	flagSet.BoolVar(&endUserMode, "enduser", false, "Write results to /gluetun/servers.json (for end users)")
	flagSet.BoolVar(&maintainerMode, "maintainer", false,
		"Write results to ./internal/constants/servers.json to modify the program (for maintainers)")
	flagSet.StringVar(&options.DNSAddress, "dns", "8.8.8.8", "DNS resolver address to use")
	flagSet.BoolVar(&options.Cyberghost, "cyberghost", false, "Update Cyberghost servers")
	flagSet.BoolVar(&options.Fastestvpn, "fastestvpn", false, "Update FastestVPN servers")
	flagSet.BoolVar(&options.HideMyAss, "hidemyass", false, "Update HideMyAss servers")
	flagSet.BoolVar(&options.Ipvanish, "ipvanish", false, "Update IpVanish servers")
	flagSet.BoolVar(&options.Ivpn, "ivpn", false, "Update IVPN servers")
	flagSet.BoolVar(&options.Mullvad, "mullvad", false, "Update Mullvad servers")
	flagSet.BoolVar(&options.Nordvpn, "nordvpn", false, "Update Nordvpn servers")
	flagSet.BoolVar(&options.PIA, "pia", false, "Update Private Internet Access post-summer 2020 servers")
	flagSet.BoolVar(&options.Privado, "privado", false, "Update Privado servers")
	flagSet.BoolVar(&options.Privatevpn, "privatevpn", false, "Update Private VPN servers")
	flagSet.BoolVar(&options.Protonvpn, "protonvpn", false, "Update Protonvpn servers")
	flagSet.BoolVar(&options.Purevpn, "purevpn", false, "Update Purevpn servers")
	flagSet.BoolVar(&options.Surfshark, "surfshark", false, "Update Surfshark servers")
	flagSet.BoolVar(&options.Torguard, "torguard", false, "Update Torguard servers")
	flagSet.BoolVar(&options.VPNUnlimited, "vpnunlimited", false, "Update VPN Unlimited servers")
	flagSet.BoolVar(&options.Vyprvpn, "vyprvpn", false, "Update Vyprvpn servers")
	flagSet.BoolVar(&options.Windscribe, "windscribe", false, "Update Windscribe servers")
	if err := flagSet.Parse(args); err != nil {
		return err
	}
	if !endUserMode && !maintainerMode {
		return ErrModeUnspecified
	}

	const clientTimeout = 10 * time.Second
	httpClient := &http.Client{Timeout: clientTimeout}
	storage := storage.New(logger, os, constants.ServersData)
	currentServers, err := storage.SyncServers(constants.GetAllServers())
	if err != nil {
		return fmt.Errorf("%w: %s", ErrSyncServers, err)
	}
	updater := updater.New(options, httpClient, currentServers, logger)
	allServers, err := updater.UpdateServers(ctx)
	if err != nil {
		return fmt.Errorf("%w: %s", ErrUpdateServerInformation, err)
	}

	if endUserMode {
		if err := storage.FlushToFile(allServers); err != nil {
			return fmt.Errorf("%w: %s", ErrWriteToFile, err)
		}
	}

	if maintainerMode {
		if err := writeToEmbeddedJSON(os, allServers); err != nil {
			return fmt.Errorf("%w: %s", ErrWriteToFile, err)
		}
	}

	return nil
}

func writeToEmbeddedJSON(os os.OS, allServers models.AllServers) error {
	const perms = 0600
	f, err := os.OpenFile("./internal/constants/servers.json",
		nativeos.O_TRUNC|nativeos.O_WRONLY|nativeos.O_CREATE, perms)
	if err != nil {
		return err
	}

	defer f.Close()

	encoder := json.NewEncoder(f)
	encoder.SetIndent("", "  ")
	return encoder.Encode(allServers)
}
