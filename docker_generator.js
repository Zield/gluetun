// Create a docker-composer file

const fs = require('fs');
const moment = require("moment-timezone");

clearFile();

let regions = [];




/*regions.push(['Australia Sydney','Australia/Sydney','11']);
regions.push(['Australia Brisbane','Australia/Brisbane','10']);
regions.push(['Australia Melbourne','Australia/Melbourne','10']);
regions.push(['Australia Adelaide','Australia/Adelaide','10.5']);
*/
//regions.push(['US Ashburn','America/Virginia','-5']);
regions.push(['US Atlanta','US/Eastern','-4']);
regions.push(['US Bend','America/Bend','-8']);
regions.push(['US Boston','America/Boston','-5']);
regions.push(['US Buffalo','America/Buffalo','-5']);
regions.push(['US Charlotte','America/Charlotte','-6']);
regions.push(['US Chicago','America/Chicago','-6']);
regions.push(['US Dallas','America/Dallas','-6']);
regions.push(['US Denver','America/Colorado','-7']);
regions.push(['US Detroit','America/Detroit','-5']);
//US Gahanna
//regions.push(['US Gahanna','America/Texas','-5']);
regions.push(['US Houston','America/Texas','-6']);
regions.push(['US Kansas City','America/Kansas','-5']);
regions.push(['US Latham','America/New_York','-5']);
regions.push(['US Las Vegas','America/Nevada','-8']);
regions.push(['US Los Angeles','America/','-8']);
regions.push(['US Maryland','America/Maryland','-5']);
regions.push(['US Miami','America/Florida','-5']);

//US Netherlands
//regions.push(['US Netherlands','America/Florida','-5']);

regions.push(['US New York City','America/New_York','-5']);
regions.push(['US New York City mp001','America/New_York','-5']);
regions.push(['US New York City st001','America/New_York','-5']);
regions.push(['US New York City st002','America/New_York','-5']);
regions.push(['US New York City st003','America/New_York','-5']);
regions.push(['US New York City st004','America/New_York','-5']);
regions.push(['US New York City st005','America/New_York','-5']);

regions.push(['US Orlando','America/Florida','-5']);
regions.push(['US Phoenix','America/Florida','-5']);

regions.push(['US Salt Lake City','America/Salt_Lake_City','-7']);
regions.push(['US San Francisco','America/San_Francisco','-8']);
//regions.push(['US San Jose','America/San_Jose','-8']);
regions.push(['US Seatle','Amerca/Washington','-8']);
regions.push(['US St Louis','America/St_Louis','-6']);
regions.push(['US Tampa','America/Florida','-5']);

regions.push(['UK Manchester','Europe/London','0']);
regions.push(['UK Glasgow','Europe/London','11']);
regions.push(['UK London mp001','Europe/London','0']);

regions.push(['United Arab Emirates','Asia/Qatar','4']);

regions.push(['Australia Sydney','Australia/Sydney','11']);
regions.push(['Australia Brisbane','Australia/Brisbane','10']);
regions.push(['Australia Melbourne','Australia/Melbourne','10']);
regions.push(['Australia Adelaide','Australia/Adelaide','10.5']);
regions.push(['Australia Perth','Australia/Perth','8']);
regions.push(['New Zealand','Pacific/Auckland','13']);

//regions.push(['Ireland Dublin','Eurpoe/Dublin','1']);
regions.push(['UK France','Europe/Paris','1']);
regions.push(['France Paris','Europe/Paris','1']);
regions.push(['France Marseille','Europe/Paris','1']);
regions.push(['Germany Berlin','Europe/Berlin','1']);
regions.push(['UK Germany','Europe/Berlin','1']);
regions.push(['Germany Frankfurt am Main','Europe/Frankfurt','1']);
regions.push(['Germany Frankfurt am Main st001','Europe/Frankfurt','1']);
regions.push(['Germany Frankfurt am Main st002','Europe/Frankfurt','1']);
regions.push(['Germany Frankfurt am Main st003','Europe/Frankfurt','1']);
regions.push(['Germany Frankfurt am Main st004','Europe/Frankfurt','1']); 
regions.push(['Germany Frankfurt am Main st005','Europe/Frankfurt','1']); 
regions.push(['Germany Frankfurt mp001','Europe/Frankfurt','1']);
regions.push(['Germany Singapour','Europe/Frankfurt','1']);

//regions.push(['Italy Milan','Europe/Milan','1']);
//regions.push(['Italy Rome','Europe/Rome','1']);
//regions.push(['Denmark Copenhagen','','1']);

regions.push(['Canada Toronto','America/Toronto','-5']);
regions.push(['Canada Toronto mp001','America/Toronto','-5']);
regions.push(['Canada Montreal','America/Montreal','-5']);
regions.push(['Canada Vancouver','America/Vancouver','-5']);

regions.push(['Singapore st001','Asia/Singapore','8']);
regions.push(['Singapore st002','Asia/Singapore','8']);
regions.push(['Singapore st003','Asia/Singapore','8']);
regions.push(['Hong Kong','Asia/Hong_Kong','8']);
regions.push(['Japan Tokyo','Asia/Tokyo','9']);

regions.push(['Japan Tokyo st001','Asia/Tokyo','9']);
regions.push(['Japan Tokyo st002','Asia/Tokyo','9']);
regions.push(['Japan Tokyo st003','Asia/Tokyo','9']);
regions.push(['Japan Tokyo st004', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st005', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st006', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st007', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st008', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st009', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st010', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st011', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st012', 'Asia/Tokyo','9']);
regions.push(['Japan Tokyo st013','Asia/Tokyo','9']);

//regions.push(['Malaysia Kuala Lumpur','Asia/Kuala_Lumpur','8']);
regions.push(['Philippines Manila','','8']);

console.log('Regions: '+ regions.length);
/*
regions[0] = ['Australia Sydney','Australia/Sydney','11'];
regions[1] = ['Australia Brisbane','Australia/Brisbane','10'];
regions[2] = ['Australia Adelaide','Australia/Adelaide','10.5'];
regions[3] = ['Australia Perth','Australia/Perth','8'];
regions[4] = ['Canada Toronto','America/Toronto','-5'];
regions[5] = ['Canada Montreal','America/Montreal','-5'];
regions[6] = ['France Paris','Europe/Paris','1'];
regions[7] = ['Hong Kong','Asia/Hong_Kong','8'];
regions[8] = ['Japan Tokyo','Asia/Tokyo','9'];
regions[9] = ['Malaysia','Asia/Kuala_Lumpur','8'];
regions[10] = ['New Zealand','Pacific/Auckland','13'];
regions[11] = ['Philippines','','8'];
regions[12] = ['Singapore','Asia/Singapore','8'];
regions[13] = ['South Africa','','2'];
regions[14] = ['UK France','Europe/Paris','1'];
regions[15] = ['UK Manchester','','0'];
regions[16] = ['UK Glasgow','','11'];
regions[17] = ['UK London mp001','Europe/London','0'];
regions[18] = ['US Atlanta','','-5'];
regions[19] = ['US Boston','','-5'];
regions[20] = ['US Chicago','America/Chicago','-6'];
regions[21] = ['US Denver','','-7'];
regions[22] = ['US Houston','','-6'];
regions[23] = ['US Las Vegas','','-8'];
regions[24] = ['US Los Angeles','','-8'];
regions[25] = ['US Maryland','','-5'];
regions[26] = ['US Miami','','-5'];
regions[27] = ['US New York City','America/New_York','-5'];
regions[28] = ['US New York City st001','America/New_York','-5'];
regions[29] = ['US New York City st002','America/New_York','-5'];
regions[31] = ['US New York City st003','America/New_York','-5'];
regions[31] = ['US New York City mp001','America/New_York','-5'];
regions.push('US Phoenix','America/Phoenix','-7'];

regions[30] = ['United Arab Emirates','Asia/Qatar','4'];

regions[32] = ['US Orlando','','-5'];
regions[33] = ['US San Francisco','','-8'];
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
        
        writeFile('  '+'healthcheck:' + '\n');
        writeFile('  '+' test: curl --fail -s https://ipinfo.io/ip || exit 1\n');
        writeFile('  '+' timeout: 20s' + '\n');
        writeFile('  '+' retries: 10' + '\n');

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
            //writeFile('  '+'image: zield1201/visi-mini:latest' + '\n');
            //writeFile('  '+'cap_add:' + '\n');
            //writeFile('   '+'- NET_ADMIN'+ '\n');
            //writeFile('  '+'depends_on: gluetun'+i+ '\n');
            writeFile('  '+'network_mode: service:gluetun'+i+'\n');

            writeFile('  '+'depends_on:\n');
            writeFile('  '+' gluetun'+i+':\n');
            writeFile('  '+'  condition: service_healthy\n');

            writeFile('  '+'volumes:' + '\n');
            writeFile('   '+'- /yourpath:/visi_'+i+'_'+x+'\n');
            writeFile('  '+'environment:' + '\n');
            writeFile('   '+'# More variables are available, see the readme table' + '\n');
            // Region Timezone Env Vars
            writeFile('   '+'- REGION=' +regions[i][0]+ '\n');
            writeFile('   '+'- WATCHER_TIMEZONE=' +regions[i][1]+ '\n');
            writeFile('   '+'- WATCHER_TIMEZONE_OFFSET='+ parseFloat(regions[i][2]) + '\n');
            // Startup and shutdown env vars
            writeFile('   '+'- START_WATCH_HOUR='+ randomInteger(7,10) + '\n');
            writeFile('   '+'- END_WATCH_HOUR='+ randomInteger(19,23) + '\n');
            writeFile('   '+'- START_WATCH_MINUTE='+ randomInteger(0,59) + '\n');
            writeFile('   '+'- END_WATCH_MINUTE='+ randomInteger(0,59) + '\n');
            writeFile('  '+'restart: always' + '\n');
        }
    }
}

function randomInteger(min, max) {
    let tempNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
    tempNumber = tempNumber > 9 ? tempNumber : '0' + tempNumber;
    return
}

/*async function getOffSet(region){
    let offest = 0;
    console.log('getting offset for '+ region);
    let offset = moment().tz(region).utcOffset();
    let nowtime = moment().tz(region).format();
    console.log('nowtime: '+ nowtime);
    console.log('offset: '+ offset);

    var d = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));
    //console.log('New string: ' + nd);
    var currentLocalHour = nd.getHours();
    console.log('Date: '+ nd.getUTCDay() + ' ' + nd.getMonth() + ' ' + nd.getFullYear());
    console.log('Current Hour: ' + currentLocalHour);
    return offset;
}*/

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

