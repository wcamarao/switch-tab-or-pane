'use babel';

import SwitchTabOrPaneView from './switch-tab-or-pane-view';
import { CompositeDisposable } from 'atom';

export default {

  SwitchTabOrPaneView: null,
  subscriptions: null,

  activate(state) {
    this.SwitchTabOrPaneView = new SwitchTabOrPaneView(state.SwitchTabOrPaneViewState);

    atom.commands.add('atom-text-editor', {'switch-tab-or-pane:left': this.moveLeft.bind(this)});
    atom.commands.add('atom-text-editor', {'switch-tab-or-pane:right': this.moveRight.bind(this)});
    atom.commands.add('atom-text-editor', {'switch-tab-or-pane:up': this.moveUp.bind(this)});
    atom.commands.add('atom-text-editor', {'switch-tab-or-pane:down': this.moveDown.bind(this)});
  },

  serialize() {},

  deactivate() {
    this.subscriptions.dispose();
  },

  moveLeft() {
    this.SwitchTabOrPaneView.move('horizontal', -1, 'Left');
  },

  moveRight() {
    this.SwitchTabOrPaneView.move('horizontal', 1, 'Right');
  },

  moveUp() {
    throw 'cmd-alt-up is now supported';
    // this.SwitchTabOrPaneView.move('vertical', -1, 'Up');
  },

  moveDown() {
    throw 'cmd-alt-down is now supported';
    // this.SwitchTabOrPaneView.move('vertical', 1, 'Down');
  },

};
