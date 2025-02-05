package privado

import (
	"errors"
	"fmt"

	"github.com/qdm12/gluetun/internal/configuration"
	"github.com/qdm12/gluetun/internal/constants"
	"github.com/qdm12/gluetun/internal/models"
	"github.com/qdm12/gluetun/internal/provider/utils"
)

var ErrProtocolUnsupported = errors.New("network protocol is not supported")

func (p *Privado) GetOpenVPNConnection(selection configuration.ServerSelection) (
	connection models.OpenVPNConnection, err error) {
	const port = 1194
	const protocol = constants.UDP
	if selection.TCP {
		return connection, fmt.Errorf("%w: TCP for provider Privado", ErrProtocolUnsupported)
	}

	servers, err := p.filterServers(selection)
	if err != nil {
		return connection, err
	}

	connections := make([]models.OpenVPNConnection, len(servers))
	for i := range servers {
		connection := models.OpenVPNConnection{
			IP:       servers[i].IP,
			Port:     port,
			Protocol: protocol,
			Hostname: servers[i].Hostname,
		}
		connections[i] = connection
	}

	if selection.TargetIP != nil {
		return utils.GetTargetIPConnection(connections, selection.TargetIP)
	}

	return utils.PickRandomConnection(connections, p.randSource), nil
}
