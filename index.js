/**
 * @module @funhouse-atelier/sails-generate-vue-component
 * @desc Generates a vue-component.
 * @type {Dictionary}
 * @usage
 *  @bash `sails generate vue-component <new-component-name>`
 *  @bash `sails generate vue-component <path>/<new-component-name>`
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 */

/**
 * Module dependencies
 */
var path = require('path');

module.exports = {

  /**
   * Absolute path to the templates for this generator
   * @type {String}
   */
  templatesDirectory: path.resolve(__dirname, './templates'),
  
  /**
   * Function to run before processing the `targets` defined below
   * @param  {Dictionary} scope
   * @param  {Dictionary} exits
   */
  before: function (scope, exits) {

    // Define the first argument provided via CLI
    let firstArg = scope.args[0];
    
    // Define an example of CLI syntax, to be displayed if generation fails
    const example = '\n\nTo create a new Vue component, use the following syntax:\n\nsails generate vue-component <new-component-name>\n  -OR-\nsails generate vue-component <path>/<new-component-name>\n';
    
    // If there is no first argument, finish with an error message
    if(typeof firstArg === 'undefined') {
      return exits.error(`You did not provide a name for the component.${example}`);
    }
    
    // If the first argument is not a string, finish with an error message
    if(typeof firstArg !== 'string') {
      return exits.error(`The name you provided for the component is not a string.${example}`);
    }
    
    // Attach all data needed to generate the files to the global "scope" variable
    firstArg = firstArg.toLowerCase();
    const firstArgPieces  = firstArg.split('/');
    scope.componentName   = firstArgPieces[firstArgPieces.length - 1];
    scope.jsFilePath      = `${firstArg}.component.js`;
    scope.lessFilePath    = `${firstArg}.component.less`;
    
    // Finished with no errors
    return exits.success();
  },

  /**
   * The files/folders to generate
   * @type {Dictionary}
   */
  targets: {

    // Generate the JS file for the component
    './assets/js/components/:jsFilePath': {
      template: 'component.js',
    },

    // Generate the LESS file for the component
    './assets/styles/components/:lessFilePath': {
      template: 'component.less',
    },
  },

  /**
   * Function to run after processing the `targets` defined above
   * @param  {Dictionary} scope
   * @param  {Function}   done
   */
  after: function (scope, done) {

    // Log success message to console
    console.log(`\nA new Vue component named <${scope.componentName}> was created. If you want to create styles specific to this component, you will need to manually import the new LESS stylesheet from your "assets/styles/importer.less" file; e.g.:\n\n@import 'components/${scope.lessFilePath}'\n`);

    // Finished
    return done();
  },
};
