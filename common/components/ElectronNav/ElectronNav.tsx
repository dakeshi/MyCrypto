import React from 'react';
import classnames from 'classnames';

import { navigationLinks } from 'config';
import translate from 'translations';
import NavigationLink from 'components/NavigationLink';
import NetworkSelect from './NetworkSelect';
import LanguageSelect from './LanguageSelect';
import NetworkStatus from './NetworkStatus';
import './ElectronNav.scss';

interface State {
  panelContent: React.ReactElement<any> | null;
  isPanelOpen: boolean;
}

export default class ElectronNav extends React.Component<{}, State> {
  public state: State = {
    panelContent: null,
    isPanelOpen: false
  };

  public render() {
    const { panelContent, isPanelOpen } = this.state;

    return (
      <div
        className={classnames({
          ElectronNav: true,
          'is-panel-open': isPanelOpen
        })}
      >
        <div className="ElectronNav-branding">
          <div className="ElectronNav-branding-logo" />
          <div className="ElectronNav-branding-beta">Alpha Release</div>
        </div>

        <ul className="ElectronNav-links">
          {navigationLinks.map(link => (
            <NavigationLink
              key={link.to}
              link={link}
              isHomepage={link === navigationLinks[0]}
              className="ElectronNavLink"
            />
          ))}
        </ul>

        <div className="ElectronNav-controls">
          <button className="ElectronNav-controls-btn" onClick={this.openLanguageSelect}>
            Change Language
            <i className="ElectronNav-controls-btn-icon fa fa-arrow-circle-right" />
          </button>
          <button className="ElectronNav-controls-btn" onClick={this.openNodeSelect}>
            Change Network
            <i className="ElectronNav-controls-btn-icon fa fa-arrow-circle-right" />
          </button>
        </div>

        <div className="ElectronNav-status">
          <NetworkStatus />
        </div>

        <div className="ElectronNav-panel">
          <button className="ElectronNav-panel-back" onClick={this.closePanel}>
            <i className="ElectronNav-panel-back-icon fa fa-arrow-circle-left" />
            {translate('MODAL_BACK')}
          </button>
          <div className="ElectronNav-panel-content">{panelContent}</div>
        </div>
      </div>
    );
  }

  private openLanguageSelect = () => {
    const panelContent = <LanguageSelect closePanel={this.closePanel} />;
    this.setState({
      panelContent,
      isPanelOpen: true
    });
  };

  private openNodeSelect = () => {
    const panelContent = <NetworkSelect closePanel={this.closePanel} />;
    this.setState({
      panelContent,
      isPanelOpen: true
    });
  };

  private closePanel = () => {
    const { panelContent } = this.state;

    // Start closing panel
    this.setState({ isPanelOpen: false });

    // Remove content when out of sight
    setTimeout(() => {
      if (this.state.panelContent === panelContent) {
        this.setState({ panelContent: null });
      }
    }, 300);
  };
}
