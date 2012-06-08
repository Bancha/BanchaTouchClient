/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 Roland Schuetz
 *
 * Licensed under GNU GENERAL PUBLIC LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha.Touch
 * @copyright     Copyright 2011-2012 Roland Schuetz
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.4
 * @license       GNU GENERAL PUBLIC LICENSE
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:true */
/*global Ext, Bancha, window */


/**
 * This is a simple Sencha Touch app, showing how to
 * retrieve & submit data from CakePHP using Bancha Project.
 */
Ext.application({
    name: 'BanchaTouch',

    icon: 'resources/images/iTunesArtwork.png',
    glossOnIcon: true,
    phoneStartupScreen: 'resources/loading/phone_startup.png',
    tabletStartupScreen: 'resources/loading/tablet_startup.png',

    
    launch: function() {
        
        /*
         * At first we tell Bancha to load all model definitions for "User" from the server
         * As soon as these are loaded, Bancha will define the model and then execute the
         * callback to create all tab panels
         */
        Bancha.onModelReady('User',function() {
            Ext.Viewport.add({
                xtype: 'tabpanel',
                fullscreen: false,
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
                            '<img height="173" src="http://banchaproject.org//tl_files/Bancha/images/logo.png" />',
                            "<p>This little App demonstrates how you can use Bancha with Sencha Touch 2</p>"
                        ].join("")
                    },

                    // This page loads data from the CakePHP model User, using Bancha
                    {
                        xtype: 'list',
                        title: 'Store Sample',
                        iconCls: 'star',
                        cls: 'users',
                        
                        itemTpl: '<div>{name}</div>',
                        store: Ext.create('Ext.data.Store', {
                            model: Bancha.getModel('User'),
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
                                        Bancha.RemoteStubs.Hello.getGreeting(unixTimestamp, textfield.getValue(),function(result) {
                                            // this is the result callback
                                            if(result.success) {
                                                Ext.Msg.alert("Greetings",result.data);
                                            } else {
                                                Ext.Msg.alert("Error","The server does not want to talk to you.");
                                            }
                                        });
                                    } else {
                                        Ext.Msg.alert("Name not defined", "Please write your name before asking for a greeting.",function() {
                                           textfield.focus();
                                        });
                                    }
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    painted: function() {
                        // if on the homescreen we have more space
                        if(Ext.Viewport.getWindowHeight() > 450) {
                            Ext.Viewport.addCls('big-screen');
                        }
                    }
                }
            });
        }); //eo onModelReady
    }
});
