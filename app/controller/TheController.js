Ext.define('CalTable.controller.TheController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.util.History'],

    refs: {
        contentPanel: '#contentPanel',
        menu: '#menu',
        menuPanel: '#menuPanel'
    },

    onLaunch: function () {
        Ext.History.init();
        Ext.History.on('change', this.navigate, this);
        this.navigate(window.location.hash);
    },

    navigate: function (id) {
        if (id) {
            if (id[0] == '#') id = id.slice(1);
            this.getContentPanel().layout.setActiveItem(id);
            this.getMenu().items.each(function (item) {
                if (item.href == '#' + id) {
                    item.disable();
                    window.document.title = item.text;
                }
                else {
                    item.enable();
                }
            });
        }
    }
});