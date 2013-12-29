'use strict';

define(function (require) {
    var View = require('regions/View');
    var MainLayout = require('layouts/main/View');

    return {
        slug: '',
        name: 'MainApp',
        pages: [{
            slug: '',
            name: 'feed',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Новости',
            title: 'Новости'
        }, {
            slug: 'friends',
            name: 'friends',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Друзья',
            title: 'Друзья'
        }, {
            slug: 'groups',
            name: 'groups',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Группы',
            title: 'Группы'
        }, {
            slug: 'photos',
            name: 'photos',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Фотографии',
            title: 'Фотографии'
        }, {
            slug: 'audio',
            name: 'audio',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Аудиозаписи',
            title: 'Аудиозаписи'
        }, {
            slug: 'video',
            name: 'video',
            views: {
                '#layout': {
                    constructor: MainLayout,
                    options: {
                        views: {
                            '#main': {
                                constructor: View,
                            }
                        }
                    }
                }
            },
            menuName: 'Видеозаписи',
            title: 'Видеозаписи'
        }]
    };

});
