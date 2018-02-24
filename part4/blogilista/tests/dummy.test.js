const dummy = require('../utils/list_helper.js').dummy;

test('dummy is called', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1);
})