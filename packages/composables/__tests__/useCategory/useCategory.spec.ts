import { useCategory } from './../../src/useCategory';

const categoriesResult = [
  { name: 'cat1',
    id: 'bbb' },
  { name: 'cat2',
    id: 'aaa' },
  { name: 'cat3',
    id: 'fcd' }
];

jest.mock('@vue-storefront/core', () => ({
  useCategoryFactory: (params) => () => params
}));

const context = {
  $vendure: {
    api: {
      getCategory: jest.fn(() =>
        Promise.resolve({
          data: {
            collections: [
              { name: 'cat1',
                id: 'bbb' },
              { name: 'cat2',
                id: 'aaa' },
              { name: 'cat3',
                id: 'fcd' }
            ],
            totalItems: 10
          }
        }))
    }
  }
};

describe('[vendure-composables] useCategory', () => {
  it('loads categories', async () => {
    const { categorySearch } = useCategory('test-category') as any;

    const response = await categorySearch(context, { options: { take: 3 } });

    expect(response).toEqual(categoriesResult);
    expect(context.$vendure.api.getCategory).toBeCalledWith({ options: { take: 3 } }, undefined);
  });
});