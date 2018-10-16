import { defaultValue } from '../../utils';
import { randId } from '../../../../shared/utils';

function getProps(schema, offset) {
  return (Array.isArray(schema.items)
    ? schema.items[offset]
    : schema.items)
  || schema.additionalItems
  || {};
}

export default {
  components: {
    Field: '../../Field',
    Value: '../../Value',
    Modal: '../../../Modal',
  },
  data() {
    return {
      keys: [],
      result: null,
    };
  },
  oncreate() {
    const { values, schema } = this.get();

    if (schema && Array.isArray(schema.items)) {
      const keys = [];
      const result = [];

      schema.items.forEach((props, offset) => {
        keys.push(randId());
        result.push(values[offset] || defaultValue(props));
      });

      this.set({ result, keys });
    }
  },
  methods: {
    append() {
      const { nextOffset, schema } = this.get();

      this.add(defaultValue(getProps(schema, nextOffset)));
    },
    remove(offset) {
      const { result, keys } = this.get();

      result.splice(offset, 1);
      keys.splice(offset, 1);

      this.set({ result, keys });
    },
    open() {
      const { schema, nextOffset } = this.get();

      this.set({
        isOpen: true,
        nextValue: defaultValue(getProps(schema, nextOffset)),
      });
    },
    sync() {
      this.add(this.get().nextValue);
    },
    edit(offset) {
      console.log(offset);
    },
    add(value) {
      const { result, keys } = this.get();

      const key = randId();

      if (!result) {
        this.set({
          keys: [key],
          result: [value],
        });
      } else {
        this.set({
          keys: keys.concat(key),
          result: result.concat(Array.isArray(value) ? [value] : value),
        });
      }
    },
  },
  computed: {
    fixedSchema({ isFixed, uiSchema }) {
      if (!uiSchema) {
        return isFixed ? [] : {};
      }

      return uiSchema;
    },
    nextOffset({ result }) {
      return result ? result.length : 0;
    },
    nextProps({
      fixedSchema, isFixed, schema, nextOffset,
    }) {
      return {
        props: getProps(schema, nextOffset),
        uiSchema: isFixed ? fixedSchema[nextOffset] || {} : fixedSchema,
      };
    },
    isFixed({ schema }) {
      return Array.isArray(schema.items);
    },
    headers({ fixedSchema, schema }) {
      const propSchema = getProps(schema, 0);
      const props = propSchema.properties
        ? Object.keys(propSchema.properties)
        : [];

      return props.map((key, offset) => ({
        label: (fixedSchema['ui:headers'] && fixedSchema['ui:headers'][offset]) || key,
        field: key,
      }));
    },
    values({ result }) {
      return result || [];
    },
    items({
      fixedSchema, isFixed, schema, values, keys,
    }) {
      return values.map((_, offset) => {
        const props = getProps(schema, offset);
        const key = keys[offset] || (keys[offset] = randId());

        return {
          key,
          props,
          offset,
          isFixed: isFixed && offset < schema.items.length,
          uiSchema: isFixed ? fixedSchema[offset] || {} : fixedSchema,
        };
      });
    },
  },
};