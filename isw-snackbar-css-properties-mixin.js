import '@polymer/polymer/polymer-legacy.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

export const IswSnackbarCssPropertiesMixin = dedupingMixin(function(superClass) {
  return class SolutionsElementMixin extends superClass {
        getSnackbarCssProperties() {
            return ['--isw-snackbar-background', '--isw-snackbar-text-color', '--isw-snackbar-action-color']
            .map(name => ({
                name, value: this._getCssProperty(name),
            }))
            .reduce((result, {name, value}) => {
                if (value) {
                    result[name] = value;
                }
                return result;
            }, {});
        }

        _getCssProperty(name) {
            if (ShadyCSS) {
              return ShadyCSS.getComputedStyleValue(this, name);
            }
            return getComputedStyle(this, name);
        }
  }
});
