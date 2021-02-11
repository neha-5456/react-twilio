import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';
import OutboundSmsButton from './OutboundSmsButton';
import OutboundSmsView from './OutboundSmsView';

const PLUGIN_NAME = 'NehaPlugin';

export default class NehaPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
   
	 // adds the sms button to the navbar
    flex.SideNav.Content.add(<OutboundSmsButton key="nav-outbound-sms-button"/>);
    
    // get the JWE for authenticating the worker in our Function
    const jweToken = manager.store.getState().flex.session.ssoTokenPayload.token

    // adds the sms view
    flex.ViewCollection.Content.add(
      <flex.View name="sms" key="outbound-sms-view-parent">
        <OutboundSmsView key="outbound-sms-view" jweToken={jweToken} />
      </flex.View>
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */

}
