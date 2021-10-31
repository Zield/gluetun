// Create a docker-composer file

const fs = require('fs');

clearFile();

let regions = [];
regions[0] = ['Australia Sydney','Australia/Sydney'];
regions[1] = ['Australia Brisbane','Australia/Brisbane'];
regions[2] = ['Australia Adelaide','Australia/Adelaide'];
regions[3] = ['Australia Perth','Australia/Perth'];
regions[4] = ['Canada Toronto','America/Toronto'];
regions[5] = ['Canada Montreal','America/Montreal'];
regions[6] = ['France Paris','Europe/Paris'];
regions[7] = ['Hong Kong','Asia/Hong_Kong'];
regions[8] = ['Japan Tokyo','Asia/Tokyo'];
regions[9] = ['Malaysia','Asia/Kuala_Lumpur'];
regions[10] = ['New Zealand','Pacific/Auckland'];
/*regions[11] = ['Philippines'];
regions[12] = ['Singapore'];
regions[13] = ['South Africa'];
regions[14] = ['UK France'];
regions[15] = ['UK Manchester'];
regions[16] = ['UK Glasgow'];
regions[17] = ['UK London mp001'];
regions[18] = ['US Atlanta'];
regions[19] = ['US Boston'];
regions[20] = ['US Chicago'];
regions[21] = ['US Denver'];
regions[22] = ['US Houston'];
regions[23] = ['US Las Vegas'];
regions[24] = ['US Los Angeles'];
regions[25] = ['US Maryland'];
regions[26] = ['US Miami'];
regions[27] = ['US New York City'];
regions[28] = ['US New York City st001'];
regions[29] = ['US New York City st003'];
regions[30] = ['United Arab Emirates'];
regions[31] = ['US New York City st005'];
regions[32] = ['US Orlando'];
regions[33] = ['US San Francisco'];
*/
async function generateDockerCompose(regions){

    writeFile('version: "3.7"' + '\n');
    writeFile('services:' + '\n');

    for(let i=0;i<regions.length;i++){
        writeFile(' '+'gluetun'+i+':' + '\n');
        writeFile('  '+'image: qmcgaw/gluetun' + '\n');

        writeFile('  '+'cap_add:' + '\n');
        writeFile('   '+'- NET_ADMIN'+ '\n');
        writeFile('  '+'network_mode: bridge' + '\n');
        writeFile('  '+'ports:' + '\n');

        let port1 = await calculatePort(8888,i);
        let port2 = await calculatePort(8388,i);
        let port3 = await calculatePort(8000,i);

        writeFile('   '+'- '+ port1 + ':'+ port1+'/tcp # HTTP proxy' + '\n');
        writeFile('   '+'- '+ port2 + ':'+ port2+'/tcp # Shadowsocks' + '\n');
        writeFile('   '+'- '+ port2 + ':'+ port2+'/udp # Shadowsocks' + '\n');
        writeFile('   '+'- '+ port3 + ':'+ port3+'/tcp # Built-in HTTP control server' + '\n');
        writeFile('  '+'#command:' + '\n');
        writeFile('  '+'volumes:' + '\n');
        writeFile('   '+'- /yourpath:/gluetun'+i+'\n');
        writeFile('  '+'environment:' + '\n');
        writeFile('   '+'# More variables are available, see the readme table' + '\n');
        writeFile('   '+'- OPENVPN_USER=RCyCnnuqVrthRQNhRK69cQCp' + '\n');
        writeFile('   '+'- OPENVPN_PASSWORD=GjGVbbgafPrTKGCqRS2VtQu8' + '\n');
        writeFile('   '+'- VPNSP=surfshark' + '\n');
        writeFile('   '+'- REGION='+ regions[i][0] + '\n');
        writeFile('   '+'# Timezone for accurate logs times' + '\n');
        writeFile('   '+'- TZ=Sydney/Australia' + '\n');
        writeFile('  '+'restart: always' + '\n');
        //regions[i]
    }
    generateVisiContainers(regions,1);
}

async function generateVisiContainers(regions,containersPerVpn){
    for(let i=0;i<regions.length;i++){
        for(let x=0;x<containersPerVpn;x++){
            writeFile(' '+'visi'+i+'_'+x+':' + '\n');
            writeFile('  '+'image: zield1201/visi_puppet_node:latest' + '\n');
            //writeFile('  '+'cap_add:' + '\n');
            //writeFile('   '+'- NET_ADMIN'+ '\n');
            //writeFile('  '+'depends_on: gluetun'+i+ '\n');
            writeFile('  '+'network_mode: service:gluetun'+i+'\n');
            writeFile('  '+'volumes:' + '\n');
            writeFile('   '+'- /yourpath:/visi_'+i+'_'+x+'\n');
            writeFile('  '+'environment:' + '\n');
            writeFile('   '+'# More variables are available, see the readme table' + '\n');
            writeFile('   '+'- REGION=' +regions[i][0]+ '\n');
            writeFile('   '+'- TIMEZONE=' +regions[i][1]+ '\n');
            writeFile('  '+'restart: always' + '\n');
        }
    }
}

async function calculatePort(startPort,increment){
    newPort = (Number(startPort) - Number(increment));
    return newPort;
}

async function writeFile(content){
    try {
        const data = fs.writeFileSync('docker-compose.yml', content,{ flag: 'a+' }, err => {});
        //file written successfully
    } catch (err) {
        console.error(err);
    }
}

function clearFile(){
    try {
        const data = fs.writeFileSync('docker-compose.yml','');
        //file written successfully
    } catch (err) {
        console.error(err);
    }
}

generateDockerCompose(regions);

