import UIContainerPlugin from 'base/ui_container_plugin'
import Events from 'base/events'
import Styler from 'base/styler'
import template from 'base/template'
import spinnerHTML from './public/spinner.html'
import spinnerStyle from './public/spinner.scss'

export default class SpinnerVHS extends UIContainerPlugin {
  get name() { return 'spinner' }
  get attributes() {
    return {
      'data-spinner':'',
      'class': 'vhs-buffering-container'
    }
  }

  constructor(container) {
    super(container)
    this.template = template(spinnerHTML)
    this.showTimeout = null
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop)
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.onStop)
    this.listenTo(this.container, Events.CONTAINER_ERROR, this.onStop)
    this.render()
  }

  onBuffering() {
    this.show()
  }

  onBufferFull() {
    // this.hide()
  }

  onStop() {
    //k    this.hide()
  }

  show() {
    if (this.showTimeout === null) {
      this.showTimeout = setTimeout(() => this.$el.show(), 300)
    }
  }

  hide() {
    if (this.showTimeout !== null) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }
    this.$el.hide()
  }

  render() {
    this.$el.html(this.template())
    const style = Styler.getStyleFor(spinnerStyle)
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    //    this.$el.hide()
    if (this.container.buffering) {
      this.onBuffering()
    }
    return this
  }
}
