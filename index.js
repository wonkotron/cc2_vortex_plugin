// Nexus Mods domain for the game. e.g. nexusmods.com/bloodstainedritualofthenight
const GAME_ID = 'carriercommand2';

//Steam Application ID, you can get this from https://steamdb.info/apps/
const STEAMAPP_ID = '1489630';

//Import some assets from Vortex we'll need.
const path = require('path');
const { fs, log, util } = require('vortex-api');

function main(context) {
    //This is the main function Vortex will run when detecting the game extension. 
    context.registerGame({
        id: GAME_ID,
        name: 'Carrier Command 2',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => 'rom_0',
        logo: 'gameart.jpg',
        executable: () => 'carrier_command.exe',
        requiredFiles: [
          'carrier_command.exe',
        ],
        setup: prepareForModding,
        environment: {
          SteamAPPId: STEAMAPP_ID,
        },
        details: {
          steamAppId: STEAMAPP_ID,
        },
    });
    return true
}

function findGame() {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
        .then(game => game.gamePath);
}

function prepareForModding(discovery) {
    return fs.ensureDirAsync(path.join(discovery.path, 'rom_0'));
}

module.exports = {
    default: main,
};