'use babel';

export default class SwitchTabOrPaneView {

  move(orientation, delta, direction) {
    const sourcePane = atom.workspace.getActivePane();
    const targetPane = this.getTargetPane(sourcePane, orientation, delta);
    const activeIndex = sourcePane.getItems().indexOf(sourcePane.getActiveItem());

    if (this.hasMoreTabs(sourcePane, activeIndex, direction)) {
      this.activate(sourcePane, sourcePane.getItems()[activeIndex + delta]);
    } else if (targetPane) {
      this.switchPane(sourcePane, targetPane, delta);
    } else {
      this.cycle(direction);
    }
  }

  activate(pane, item) {
    pane.activateItem(item);
    pane.activate();
  }

  switchPane(from, to) {
    const i = from.id < to.id ? 0 : to.getItems().length - 1;
    this.activate(to, to.getItems()[i]);
  }

  hasMoreTabs(pane, activeIndex, direction) {
    const method = 'hasMoreTabs' + direction;
    return this[method](activeIndex, pane);
  }

  hasMoreTabsLeft(activeIndex) {
    return activeIndex > 0;
  }

  hasMoreTabsRight(activeIndex, pane) {
    const lastIndex = pane.getItems().length - 1;
    return activeIndex < lastIndex;
  }

  cycle(direction) {
    const panes = atom.workspace.getPanes();
    const method = 'cycle' + direction;
    this[method](panes);
  }

  cycleLeft(panes) {
    const pane = panes[panes.length - 1];
    const lastIndex = pane.getItems().length - 1;
    this.activate(pane, pane.getItems()[lastIndex]);
  }

  cycleRight(panes) {
    const pane = panes[0];
    this.activate(pane, pane.getItems()[0]);
  }

  getTargetPane(sourcePane, orientation, delta) {
    const [axis, child] = this.getAxis(sourcePane, orientation);
    if (axis) {
      return this.getRelativePane(axis, child, delta);
    }
  }

  getRelativePane(axis, source, delta) {
    const position = axis.children.indexOf(source);
    let targetPaneIndex = position + delta;
    if (targetPaneIndex < 0 || targetPaneIndex >= axis.children.length) {
      return null;
    }
    return axis.children[targetPaneIndex].getPanes()[0];
  }

  getAxis(pane, orientation) {
    let axis = pane.parent;
    let child = pane;
    while (true) {
      if (axis.constructor.name !== 'PaneAxis') {
        return [null, null];
      }
      if (axis.orientation === orientation) {
        break;
      }
      child = axis;
      axis = axis.parent;
    }
    return [axis, child];
  }

}
