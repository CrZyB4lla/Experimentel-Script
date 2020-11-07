import * as alt from 'alt';
import * as native from 'natives';

let webview;
alt.onServer('vehicle:SetInto', newVehicle => 
{
    const localPlayer = alt.Player.local.scriptID;
    alt.setTimeout(() => 
    {
        native.setPedIntoVehicle(localPlayer, newVehicle.scriptID, -1);
    }, 100);
});


alt.onServer('spawn:Player', pos => 
{
    alt.setTimeout(() => 
    {
        alt.emitServer('spawn:Ready', pos);
    }, 100);
});

//alt.emitClient(player, 'webview:Load');
alt.onServer('webview:Load', () => 
{
    if(!webview) 
    {
        webview = new alt.WebView('http://resource/client/html/index.html');
        webview.on('close:Webview', closeWebview);
        webview.on('ready', ready);
    }

    webview.focus();
    alt.showCursor(true);

    webview.emit('display:Name', alt.Player.local.name);
});


function ready()
{
    webview.emit('display:Name', alt.Player.local.name);
}

function closeWebview() 
{
    alt.showCursor(false);
    webview.destroy();
    webview = undefined;
}
