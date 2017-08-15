Ext.Loader.setConfig({

});

Ext.application({
    views: ['MainView'],
    controllers: ['TheController'],
    models: ['FolioModel'],
    stores: ['FolioStore'],
    name: 'CalTable',

    launch: function () {
        Ext.create('CalTable.view.MainView');
        console.log('Step 1: app.js running');
    }
});