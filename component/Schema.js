export const ItemPriceSchema = {
  name: 'ItemPrice',
  properties: {
    id: 'int',
    mart: 'string',
    item: 'string',
    price: 'int',
    unitValue: 'int',
    unit: 'string'
  }
};

export const TempSchema = {
  name: 'Temp',
  properties: {
    key: 'string',
    value: 'string'
  }
};

export const SchemaVersion = 1;
