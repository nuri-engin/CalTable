Ext.define('CalTable.store.FolioStore', {
    extend: 'Ext.data.Store',
    requires: ['CalTable.model.FolioModel'],
    model: 'CalTable.model.FolioModel',

    proxy: {
        type: 'ajax',
        url: 'http://192.168.0.223:8223/oresto/folio/list',
        reader: {
            type: 'json'
        }
    },

    autoLoad: true
});