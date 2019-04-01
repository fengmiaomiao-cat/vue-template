let baseURL = ''；
if（process.NODE_ENV == 'development'）｛
 baseURL = 'test.api.com'；
｝else if（process.NODE_ENV == 'production'）｛
 baseURL = 'pro.api.com'；
｝
export baseURL；
