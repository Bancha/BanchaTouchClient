/*!
 *
 * Bancha : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://bancha.io)
 * Copyright 2011-2014 codeQ e.U.
 *
 * @package       BanchaTouchClient
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://bancha.io Bancha
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 *
 * For more information go to http://bancha.io
 */

// include Bancha
Ext.Loader.setConfig('enabled', true);
Ext.Loader.setPath('Bancha','/bancha/js');
Ext.syncRequire('Bancha.Initializer');

/**
 * This is a simple Sencha Touch app, showing how to
 * retrieve & submit data from CakePHP using Bancha.
 */
Ext.application({
    name: 'BanchaTouch',

    // stlying
    icon: 'resources/images/iTunesArtwork.png',
    isIconPrecomposed: false, // apply glossy effect to icon
    startupImage: {
        '320x460'  : 'resources/loading/phone_startup.png',
        '640x920'  : 'resources/loading/phone_startup.png',
        '640x1096' : 'resources/loading/phone_startup.png',
        '768x1004' : 'resources/loading/tablet_startup.png',
        '748x1024' : 'resources/loading/tablet_startup.png',
        '1536x2008': 'resources/loading/tablet_startup.png',
        '1496x2048': 'resources/loading/tablet_startup.png'
    },

    // require Bancha model
    models: [
        'Bancha.model.User'
    ],

    // build viewport
    launch: function() {

        Ext.create('Ext.tab.Panel', {
            fullscreen: true,
            tabBarPosition: 'bottom',
            ui: 'dark',
            items: [
                // This is the home page, just some simple html
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<img height="173" src="http://bancha.io/tl_files/Bancha/images/logo.png" />',
                        '<p>This little App demonstrates how you can use Bancha with Sencha Touch 2</p>'
                    ].join('')
                },

                // This page loads data from the CakePHP model User, using Bancha
                {
                    xtype: 'list',
                    title: 'Store Sample',
                    iconCls: 'star',
                    cls: 'users',

                    itemTpl: '<div>{name}</div>',
                    store: Ext.create('Ext.data.Store', {
                        model: 'Bancha.model.User',
                        autoLoad: true
                    }),

                    onItemDisclosure: (function() {
                        var tpl = new Ext.XTemplate([
                            'Name: {name}<br/>',
                            'E-Mail: {email}<br/>',
                            'Height: {height}cm<br/>'
                        ].join(''));

                        return function(record, btn, index) {
                            Ext.Msg.alert('Additional Information',tpl.apply(record.data),Ext.emptyFn);
                        };
                    }()),
                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    }
                },

                // This is the contact page, which features a form and a button. The button submits the form
                {
                    xtype: 'formpanel',
                    title: 'Controller',
                    iconCls: 'user',
                    cls: 'controller',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Exposed Remote Method',
                            instructions: [
                                'Just type in a name and get the appropriate greeting for the current day time.',
                                'If your name is Judas the server will return with an unsucessfull response.'
                            ].join(''),

                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name',
                                    name: 'name',
                                    require: true
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Get Greetings',
                            ui: 'confirm',

                            // The handler is called when the button is tapped
                            handler: function() {

                                // This looks up the items stack above, getting a reference to the first form it see
                                var textfield = this.up('formpanel').down('textfield');

                                if(textfield.getValue()) {
                                    // send the request to the server
                                    var unixTimestamp = (Date.now()/1000).toString();
                                    Bancha.getStub('Hello').getGreeting(unixTimestamp, textfield.getValue(),function(result) {
                                        // this is the result callback
                                        if(result.success) {
                                            Ext.Msg.alert('Greetings', result.data);
                                        } else {
                                            Ext.Msg.alert('Error', 'The server does not want to talk to you.');
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert(
                                        'Name not defined',
                                        'Please write your name before asking for a greeting.', function() {
                                        textfield.focus();
                                    });
                                }
                            }
                        }
                    ]
                },
                // This is the home page, just some simple html
                {
                    title: 'About Bancha',
                    iconCls: 'info',
                    cls: 'info',
                    scrollable: true,
                    html: [
                        '<img height="85" src="http://bancha.io/tl_files/Bancha/images/logo.png" />',
                        '<p style="height:85px; padding-top:20px;">Bancha makes creating Apps with a CakePHP backend beautifull and easy.</p>',
                        '<p><br />The code can be found <a href="https://github.com/Bancha/BanchaTouchClient" target="_blank">on GitHub</a>.</p>',
                        '<p>For more information go to <a href="http://bancha.io" target="_blank">bancha.io</a></p>'
                    ].join('')
                }
            ],
            listeners: {
                painted: function() {
                    // if it's not a mobile screen, we have more space
                    if(Ext.Viewport.getWindowHeight() > 450) {
                        Ext.Viewport.addCls('big-screen');
                    }
                }
            }
        });
    } //eo launch
});
