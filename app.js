Ext.Loader.setConfig({

});

Ext.application({
    views: ['MainView'],
    controllers: ['TheController'],
    name: 'CalTable',

    launch: function () {
        Ext.create('CalTable.view.MainView');
        console.log('so.. 1. app.js running');
    }
});