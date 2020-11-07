import * as alt from 'alt';
import chat from 'chat';

const spawnPos ={
    x: -2639.872,
    y: 1866.812,
    z: 160.135,
}

const modelstart = 'mp_m_freemode_01';


alt.on('playerConnect', (player) => 
{
    alt.emitClient(player, 'spawn:Player', spawnPos);
});

alt.onClient('spawn:Ready', (player, pos) => 
{
    player.model = 'mp_m_freemode_01';
    player.spawn(pos.x, pos.y, pos.z, 0);
});





chat.registerCmd('veh', (player, arg) => 
{

    if(!arg || arg.length <= 0) 
    {
        chat.send(player, '/veh(model]');
        return;
    }

    try {
        const newVehicle = new alt.Vehicle(arg[0], player.pos.x, player.pos.y, player.pos.z, 0,0,0);
        alt.emitClient(player, 'vehicle:SetInto', newVehicle);
    } catch(err) {
        chat.send(player, 'Das Model des Fahrzeuges stimmt nicht über ein!');
    }
}); 


chat.registerCmd('leben', (player, arg) =>
{
    if(!arg || arg.length <= 0) {
        chat.send(player, 'benutze /leben(amount)');
        return;
    }

    let amount = parseInt(arg[0]);
    if(amount <100) {
        amount += 100;
    }

    if(isNaN(amount)){
        chat.send(player, 'The Amount specified; was not a number.');
        return;
    }

    player.health = amount;
});

chat.registerCmd('loadepage', (player) => 
{
    alt.emitClient(player, 'webview:Load');
});


const vehicle = new alt.Vehicle('infernus', -1291.7142333984375, 83.43296813964844, 54.8916015625, 0, 0, 0);
// Set the vehicle's engine on. 
vehicle.engineOn = true;


// Adjust the primary color of the vehicle to red.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};

alt.onClient('Server:VehicleEngine', SwitchEngineStateHandle);

function SwitchEngineStateHandle(vehicle) {
    console.log('vehicle1');
    vehicle.manuelEngineControl(true);
    if (!vehicle) return;
    if (vehicle.engineOn) {
        console.log('motorstart');
        vehicle.engineOn = false;
    } else {
      vehicle.engineOn = true;
     }
}
