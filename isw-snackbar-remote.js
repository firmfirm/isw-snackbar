/**
`isw-snackbar`
Material Design Polymer 2.0 Snackbar / Toast, stacking context safe with remote-control.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IswSnackbarCssPropertiesMixin } from './isw-snackbar-css-properties-mixin.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
let snackId = 1;
class IswSnackbarRemote extends IswSnackbarCssPropertiesMixin(PolymerElement) {
    static get is() {
				return 'isw-snackbar-remote';
    }

    static get properties() {
				return {
            message: {
                type: String,
                notify: true
            },
            duration: {
                type: Number,
                notify: true,
                value: 3000
            },
            actionButton: String,
            snackId: {
                type: Number,
                value() { return snackId++; },
            },
            _action: {
                type: Object,
                computed: '_computeAction(actionButton)',
            },
				};
    }

    disconnectedCallback() {
				this.close();
    }

    open() {
				document.dispatchEvent( new CustomEvent( 'isw-snackbar-open', { detail: {
            message: this.message, duration: this.duration, id: this.snackId,
            action: this._action, cssProperties: this.getSnackbarCssProperties(),
				} } ) );
    }

    close() {
				document.dispatchEvent( new CustomEvent( 'isw-snackbar-close', { detail: {
            id: this.snackId,
				} } ) );
    }

    _computeAction(message) {
				if (!message) return;
				const handler = () => this.dispatchEvent( new Event( 'action-tap' ) );
				return { message, handler };
    }
}

window.customElements.define( IswSnackbarRemote.is, IswSnackbarRemote );
