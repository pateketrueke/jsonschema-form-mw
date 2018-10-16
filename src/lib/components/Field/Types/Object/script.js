import { getId } from '../../utils';

export default {
  components: {
    Field: '../../Field',
  },
  data() {
    return {
      result: null,
    };
  },
  computed: {
    fixedSchema({ uiSchema }) {
      return uiSchema || {};
    },
    fixedValues({ result }) {
      return result || {};
    },
    fields({
      name, rootId, schema, fixedSchema,
    }) {
      if (!(schema && schema.properties)) {
        return [];
      }

      return Object.entries(schema.properties)
        .map(([key, props]) => ({
          id: getId(rootId, name !== '__ROOT__' ? `${name}[${key}]` : key, true),
          name: name !== '__ROOT__' ? `${name}[${key}]` : key,
          uiSchema: fixedSchema[key] || {},
          field: key,
          props,
        }), []);
    },
  },
};