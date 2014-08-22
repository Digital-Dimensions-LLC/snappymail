/* RainLoop Webmail (c) RainLoop Team | Licensed under CC BY-NC-SA 3.0 */

(function (module) {

	'use strict';

	var
		window = require('../External/window.js'),
		$ = require('../External/jquery.js'),
		$window = require('../External/$window.js'),
		$html = require('../External/$html.js'),
		
		Globals = require('../Common/Globals.js'),
		Plugins = require('../Common/Plugins.js'),
		Utils = require('../Common/Utils.js')
	;

	module.exports = function (RL) {

		Globals.__RL = RL;

		RL.setupSettings();

		Plugins.__boot = RL;
		Plugins.__remote = RL.remote();
		Plugins.__data = RL.data();

		$html.addClass(Globals.bMobileDevice ? 'mobile' : 'no-mobile');

		$window.keydown(Utils.killCtrlAandS).keyup(Utils.killCtrlAandS);
		$window.unload(function () {
			Globals.bUnload = true;
		});

		$html.on('click.dropdown.data-api', function () {
			Utils.detectDropdownVisibility();
		});

		// export
		window['rl'] = window['rl'] || {};
		window['rl']['addHook'] = Plugins.addHook;
		window['rl']['settingsGet'] = Plugins.mainSettingsGet;
		window['rl']['remoteRequest'] = Plugins.remoteRequest;
		window['rl']['pluginSettingsGet'] = Plugins.settingsGet;
		window['rl']['createCommand'] = Utils.createCommand;

		window['rl']['EmailModel'] = require('../Models/EmailModel.js');
		window['rl']['Enums'] = require('../Common/Enums.js');

		window['__RLBOOT'] = function (fCall) {

			// boot
			$(function () {

				if (window['rainloopTEMPLATES'] && window['rainloopTEMPLATES'][0])
				{
					$('#rl-templates').html(window['rainloopTEMPLATES'][0]);

					_.delay(function () {

						RL.bootstart();
						$html.removeClass('no-js rl-booted-trigger').addClass('rl-booted');

					}, 50);
				}
				else
				{
					fCall(false);
				}

				window['__RLBOOT'] = null;
			});
		};

	};

}(module));