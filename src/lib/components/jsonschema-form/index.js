const loadScript = document.currentScript.import;

let jsonschemaForm;

loadScript([
  '//cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.development.js',
  '//cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.development.js',
  '//unpkg.com/react-jsonschema-form@0.50.1/dist/react-jsonschema-form.js',
  '//unpkg.com/classnames@2.2.5/index.js',
  '//unpkg.com/prop-types@15.5.10/prop-types.js',
  '//unpkg.com/react-input-autosize@2.0.0/dist/react-input-autosize.js',
  '//unpkg.com/react-select/dist/react-select.js',
  '//unpkg.com/react-select/dist/react-select.css',
  '//unpkg.com/react-json-view@1.16.1/dist/main.js',
  '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/react-datetime/2.10.3/react-datetime.js',
  '//cdnjs.cloudflare.com/ajax/libs/react-datetime/2.10.3/css/react-datetime.css',
]);

loadScript('jsonschema-form/resource').then(resourceFactory => {
  jsonschemaForm = resourceFactory;
});

document.currentScript.exports = {
  init(node, context) {
    if (context.failure) {
      node.innerHTML = `<pre>${JSON.stringify(context, null, 2)}</pre>`;
      return;
    }

    context.action = context.action || (context.isNew ? 'new' : '');

    switch (context.action) {
      case 'index':
        jsonschemaForm.initTable(node, context);
        break;

      case 'edit':
      case 'new':
        jsonschemaForm.initForm(node, context);
        break;

      case 'show':
      default:
        jsonschemaForm.initViewer(node, context);
        break;
    }
  },
};
