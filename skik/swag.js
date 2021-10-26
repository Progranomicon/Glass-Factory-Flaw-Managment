(function(){
    var dev = 'Если есть проблемы/просьбы/пожелания по коду - ищите меня в http://sychtube.com/r/sosach';
    window.config = {}; //настройки
    window.config.autoUpdate = {}; //настройки авто обновления
    window.config.favorites = {}; //настройки избранного
    window.thread = {}; //область хранения переменных/данных о треде
    window.threadstats = {}; //настройки популярных тредов

    window.config.loadCaptchaTimeout = 30000; //таймаут в миллисекундах функции загрузки капчи
    window.config.updatePostsTimeout = 30000; //таймаут в миллисекундах функции загрузки новых постов с сервера
    window.config.autoUpdate.minInterval = 10; //Минимальный интервал между обновлениями в секундах
    window.config.autoUpdate.maxInterval = 30; //Максимальный интервал между обновлениями в секундах
    window.config.autoUpdate.stepInterval = 5; //Сколько прибавлять при пересчёте интервала в секундах
    window.config.autoUpdate.faviconDefault = '<link id="favicon" rel="shortcut icon" href="/favicon.ico"/>'; //Дефолтная иконка
    window.config.autoUpdate.faviconNewposts = '<link id="favicon" rel="shortcut icon" href="/makaba/templates/img/favicon_newposts.ico"/>'; //Иконка для оповещения о новых постах
    window.config.autoUpdate.faviconDeleted = '<link id="favicon" rel="shortcut icon" href="/makaba/templates/img/favicon_deleted.ico"/>'; //Иконка для оповещения о удалённом треде
    window.config.favorites.interval_min = 15; //минимальный промежуток проверки в секундах
    window.config.favorites.interval_max = 60*60*12; //максильманый промежуток проверки в секундах
    window.config.favorites.interval_multiplier = 2; //множитель времени проверок. При новых постах сбрасывается на interval_min
    window.config.favorites.interval_error = 60*2; //время в секундах, через которое надо повторить после ошибки
    window.config.favorites.interval_del_recheck = 60*10; //время в секундах, через которое надо проверить удалён ли тред на самом деле
    window.config.favorites.interval_lock = 60*5; //блокирующий интервал для внутреннего использования
    window.config.title = document.title; //Тайтл окна
    window.config.styles = { //стили
        makaba: '/makaba/templates/css/makaba.css',
        futaba: '/makaba/templates/css/futaba.css',
        burichan: '/makaba/templates/css/burichan.css',
        muon: '/makaba/templates/css/muon.css',
        neutron: '/makaba/templates/css/neutron.css',
        gurochan: '/makaba/templates/css/gurochan.css',
        konsole: '/makaba/templates/css/konsole.css'
    };
    window.threadstats.refresh = 60; //как часто обновлять данные
    window.threadstats.retry = 10; //через сколько секунд повторить запрос, если была ошибка
    window.threadstats.request_timeout = 30000; //таймаут для подключения в ms
    window.threadstats.count = 10; //сколько тредов показывать
    window.tz_offset = +3; //часовой пояс сервера
})(); //конфиг
window.Store = {
    //Класс работы с хранилищем
    //Пути передавать в формате строки типа "form.email" / "form.floating.pos.x" / "form.floating.pos.y" /

    memory: {},
    type: null,

    init: function() {
        if(this.html5_available()) {
            this.type = 'html5';
            this.html5_load();
        }else if(this.cookie_available()) {
            this.type = 'cookie';
            this.cookie_load();
        }
        //todo удалить старые скрытые треды
    },

    //если не смог получить вернёт undefined иначе значение
    get: function(path, default_value) {
        var path_array = this.parse_path(path);
        if(!path_array) return default_value;
        var pointer = this.memory;
        var len = path_array.length;

        for(var i=0;i<len-1;i++) {
            var element = path_array[i];
            if(!pointer.hasOwnProperty(element)) return default_value;
            pointer = pointer[element];
        }
        var ret = pointer[path_array[i]];
        if(typeof(ret) == 'undefined') return default_value;
        return ret;
    },

    //если не смог выставить вернёт false иначе true
    set: function(path, value) {
        if(typeof(value) == 'undefined') return false;
        if(this.type) this[this.type + '_load']();

        var path_array = this.parse_path(path);
        if(!path_array) return false;
        var pointer = this.memory;
        var len = path_array.length;

        for(var i=0;i<len-1;i++) {
            var element = path_array[i];
            if(!pointer.hasOwnProperty(element)) pointer[element] = {};
            pointer = pointer[element];
            if(typeof(pointer) != 'object') return false;
        }
        pointer[path_array[i]] = value;

        if(this.type) this[this.type + '_save']();

        return true;
    },

    //если не смог удалить вернёт false иначе true
    del: function(path) {
        var path_array = this.parse_path(path);
        if(!path_array) return false;
        if(this.type) this[this.type + '_load']();

        var pointer = this.memory;
        var len = path_array.length;
        var element, i;

        for(i=0;i<len-1;i++) {
            element = path_array[i];
            if(!pointer.hasOwnProperty(element)) return false;
            pointer = pointer[element];
        }

        if(pointer.hasOwnProperty(path_array[i])) delete(pointer[path_array[i]]);

        this.cleanup(path_array);

        if(this.type) this[this.type + '_save']();

        return true;
    },

    //чистим пустые объекты
    cleanup: function(path_array) {
        var pointer = this.memory;
        var objects = [this.memory];
        var len = path_array.length;
        var i;

        for(i=0;i<len-2;i++) { //этого цикла можно было избежать, использую del, но код становится слишком засранным
            var element = path_array[i];
            pointer = pointer[element];
            objects.push(pointer);
        }

        for(i=len-2;i>=0;i--) {
            var object = objects[i];
            var key = path_array[i];
            var is_empty = true;
            $.each(object[key], function() { is_empty=false; return false; });

            if(!is_empty) return true; //закончили чистку

            delete(object[key]);
        }

    },

    reload: function() {
        if(this.type) this[this.type + '_load']();
    },

    'export': function() {
        return JSON.stringify(this.memory);
    },

    'import': function(data) {
        try {
            this.memory = JSON.parse(data);
            if(this.type) this[this.type + '_save']();
            return true;
        } catch(e) {
            return false;
        }
    },

    parse_path: function(path) {
        var test = path.match(/[a-zA-Z0-9_\-\.]+/);
        if(test == null)  return false;
        if(!test.hasOwnProperty('0'))  return false;
        if(test[0] != path) return false;

        return path.split('.');
    },

    ////////////////////////////////////////////
    html5_available: function() {
        if(!window.Storage) return false;
        if(!window.localStorage) return false;
        try {
            localStorage.__storage_test = 'wU1vJ0p3prU1';
            if(localStorage.__storage_test != 'wU1vJ0p3prU1') return false;
            localStorage.removeItem('__storage_test');
            return true;
        } catch(e) {
            return false;
        }
    },

    html5_load: function() {
        if(!localStorage.store) return;
        this.memory = JSON.parse(localStorage.store);
    },

    html5_save: function() {
        localStorage.store = JSON.stringify(this.memory);
    },

    ////////////////////////////////////////////
    cookie_available: function() {
        try {
            $.cookie('__storage_test', 'wU1vJ0p3prU1');
            if($.cookie('__storage_test') != 'wU1vJ0p3prU1') return false;
            $.removeCookie('__storage_test');
            return true;
        } catch(e) {
            return false;
        }
    },

    cookie_load: function() {
        var str = $.cookie('store');
        if(!str) return;
        this.memory = JSON.parse(str);
    },

    cookie_save: function() {
        var str = JSON.stringify(this.memory);
        $.cookie('store', str, 365*5);
    }
};
window.Media = {
    processors: [],
    generators: {},
    unloaders: {},
    thumbnailers: {},

    add: function(type, substr, regexp, fields) {
        //функция добавления нового "провайдера"
        //type - текст, пример "youtbe"
        //substr - текст, который должен быть в ссылке, чтоб испытывать на ней регулярку
        //regexp - текст, регулярное выражение для парсинга
        //fields - объект вида {id: 0, album: 1} тогда из регулярки будет возвращено {id: res[0], album: res[1]}
        var regobj = new RegExp(regexp, 'i');
        this.processors.push([type, substr, regobj, fields]);
    },

    addGenerator: function(type, func) {
        this.generators[type] = func;
    },

    addUnloader: function(type, func) {
        this.unloaders[type] = func;
    },

    addThumbnailer: function(type, func) {
        this.thumbnailers[type] = func;
    },

    parse: function(url) {
        var proc_len = this.processors.length;
        var ret;

        for(var i=0;i<proc_len;i++) {
            var proc = this.processors[i];
            if(url.indexOf(proc[1]) < 0) continue; //ну да, proc[1] как-то не ок. Когда-то я об этом пожалею

            ret = this.getValues(url, proc);
            if(ret) break;
        }

        return ret;
    },

    getValues: function(url, proc) {
        var type = proc[0];
        var regexp = proc[2];
        var fields = proc[3];
        var values = {type: type};

        var reg_result = regexp.exec(url);
        if(!reg_result) return false;

        for(var field_name in fields) {
            if(!fields.hasOwnProperty(field_name)) continue;
            if(!reg_result.hasOwnProperty(fields[field_name])) return false;

            values[field_name] = reg_result[fields[field_name]];
        }

        return values;
    },

    getEmbedCode: function(type, id, cb) { //переписать если вдруг появится что-то кроме ID. Не хочу пачкать "data-" ради совместимости
        this.generators[type]({id: id}, cb);
    },

    processLinks: function(el) {
        el.each(function(){
            var el = $(this);
            var url = el.text();
            var obj = Media.parse(url);
            if(!obj) return;
            var post = el.closest('.post');

            var button_expand = $('<span href="#" class="media-expand-button">[РАСКРЫТЬ]</span>');
            var button_hide = $('<span href="#" class="media-hide-button">[ЗАКРЫТЬ]</span>');
            var button_loading = $('<span class="media-expand-loading">[Загрузка...]</span>');

            if(Media.thumbnailers.hasOwnProperty(obj.type) && Store.get('old.media_thumbnails', true)) {
                var on_hover = Store.get('old.media_thumbnails_on_hover', true);
                var thumbnail = $('<div class="media-thumbnail" ' + (on_hover?'style="display:none"':'') + '>' + Media.thumbnailers[obj.type](obj) + '</div>');
                var mthumbnail = $('#media-thumbnail');
                if(on_hover) {
                    el.hover(function(e){
                        mthumbnail
                            .append(thumbnail)
                            .css({
                                position: 'absolute',
                                display: 'block',
                                'z-index': '999',
                                top: e.pageY + 'px',
                                left: e.pageX + 'px'
                            });
                        thumbnail.show();
                    });
                    el.mouseout(function(){
                        thumbnail.hide();
                        mthumbnail.hide();
                    });
                    el.mousemove(function(e){
                        mthumbnail
                            .css({
                                top: (e.pageY - 10) + 'px',
                                left: (e.pageX + 30) + 'px'
                            });
                    });
                }else{
                    button_expand.append(thumbnail);
                }
            }
            el.after(button_expand);
            button_expand.click(function(){
                button_expand.hide();
                button_expand.after(button_loading);
                var expanded = post.data('expanded-media-count') || 0;
                expanded++;
                post.data('expanded-media-count', expanded);
                if(expanded == 1 && window.kostyl_class) post.addClass('expanded-media');

                Media.getEmbedCode(obj.type, obj.id, function(html) {
                    button_loading.remove();
                    if(!html) return button_expand.show();
                    var embed = $('<br>' + html + '<br>');

                    el.after(embed);
                    el.after(button_hide);

                    button_hide.click(function() {
                        embed.remove();
                        button_hide.remove();
                        button_expand.show();
                        if(Media.unloaders.hasOwnProperty(obj.type)) Media.unloaders[obj.type](el); //костыль

                        var expanded = post.data('expanded-media-count');
                        expanded--;
                        post.data('expanded-media-count', expanded);
                        if(expanded == 0 && window.kostyl_class) post.removeClass('expanded-media');

                        return false;
                    });

                    return false;
                });

                return false;
            });
        });
    }
};
window.Favorites = {
    /* Структура избранных тредов:
    board - строка, название борды, в которой тред
    title - строка, заголовок
    last_post - число, номер последнего поста
    next_check - число, таймстамп, когда нужно проверить тред на новые посты
    last_interval - число, время в минутах, которое надо будет выставиь в next_check и умножить на множитель из конфига
    new_posts - число, количество новых сообщений
    deleted - bool, true если тред удалён. При следующей проверке, если он на самом деле удалён, он будет удалён из списка
    */
    timer: 0,
    current: null,
    busy: false,
    visible: false,
    gevent_num: false,
    gevent: false,

    isFavorited: function(num) {
        return !!Store.get('favorites.' + num, false);
    },
    remove: function(num) {
        if(!this.isFavorited(num)) throw new Error('Вызов Favorites.remove(' + num + ') для несуществующего треда');
        Store.del('favorites.' + num);
        if(!this.busy) this.reset();

        this.render_remove(num);
        Gevent.emit('fav.remove', num);
    },
    add: function(num) {
        if(this.isFavorited(num)) throw new Error('Вызов Favorites.add(' + num + ') для существующего треда');
        var post = Post(num);
        var title = post.getTitle();
        var last = post.last().num;
        var data = {
            board: window.thread.board,
            title: title,
            last_post: last,
            next_check: Math.floor((+new Date)/1000)+window.config.favorites.interval_min,
            last_interval: window.config.favorites.interval_min
        };

        Store.set('favorites.' + num, data);
        this.render_add(num, data);
        Gevent.emit('fav.add', [num, data]);

        if(!window.thread.id) this.reset();
    },
    reset: function() {
        this.resetCurrent();
        if(this.current) this.timerRestart();

        this.busy = false;
    },
    timerStop: function() {
        if(!this.timer) return;
        clearTimeout(this.timer);
        this.timer = null;
    },
    timerRestart: function() {
        this.timerStop();
        var currentMins = Math.floor((+new Date)/1000);
        var delta = this.getCurrent().next_check-currentMins;
        var ms;
        var that = this;

        if(delta < 1) {
            ms = 1;
        }else{
            ms = delta*1000;
        }

        this.timer = setTimeout(function(){
            that.preExecuteCheck();
        }, ms);
    },
    getCurrent: function() {
        return Store.get('favorites.' + this.current, false);
    },
    resetCurrent: function() {
        this.current = null;
        var favlist = Store.get('favorites', {});
        var del_behavior = Store.get('favorites.deleted_behavior', 2);

        for(var key in favlist) {
            if(!favlist.hasOwnProperty(key)) continue;
            if(key == window.thread.id) continue;
            if(!favlist[key].hasOwnProperty('next_check')) continue;
            if(this.isLocked(key)) continue;

            if(!this.current || favlist[this.current].next_check > favlist[key].next_check) {
                if(favlist[key].deleted && del_behavior == 0) continue;
                this.current = key;
            }
        }
    },
    preExecuteCheck: function() { //костыль для того, чтоб опросить другие вкладки о треде
        var that = this;
        this.busy = true;

        this.render_refreshing(this.current);

        Gevent.onceNtemp('fav.abortExec' + this.current, 1000, function(){
            that.setNextCheck(that.current, window.config.favorites.interval_lock);
            that.render_refreshing_done(that.current);
            that.reset();
        }, function() {
            that.executeCheck();
        });

        Gevent.emit('fav.preExecuteCheck', this.current);
    },
    executeCheck: function() {
        var old_current = this.getCurrent().next_check;
        var old_current_num = this.current;
        Store.reload();
        if(this.isLocked() || old_current != this.getCurrent().next_check){
            this.render_refreshing_done(old_current_num);
            return this.reset();
        }

        this.lock();

        var current = this.getCurrent();
        var fetch_opts = {
            thread: this.current,
            from_post: current.last_post+1,
            board: current.board
        };
        var that = this;

        Post(1)._fetchPosts(fetch_opts, function(res) {
            if(res.hasOwnProperty('error')) {
                if(res.error == 'server' && res.errorCode == -404) {
                    that.deleted(that.current);
                }else{
                    that.setNextCheck(that.current, window.config.favorites.interval_error);
                }
            }else if(res.data.length) {
                that.setNewPosts(res.data.length);
                that.setLastPost(res.data);
                that.setNextCheck(that.current, window.config.favorites.interval_min);
                if(Store.get('favorites.show_on_new', true)) that.show();
            }else {
                that.setNextCheck(that.current, current.last_interval * window.config.favorites.interval_multiplier);
            }

            that.unlock();
            that.render_refreshing_done(that.current);
            return that.reset();
        });
    },
    setNextCheck: function(num, mins) {
        var thread = Store.get('favorites.' + num);

        if(mins < window.config.favorites.interval_min) mins = window.config.favorites.interval_min;
        if(mins > window.config.favorites.interval_max) mins = window.config.favorites.interval_max;

        thread.next_check = Math.floor((+new Date)/1000)+mins;
        thread.last_interval = mins;

        Store.set('favorites.' + num + '.next_check', thread.next_check);
        Store.set('favorites.' + num + '.last_interval', thread.last_interval);
    },
    forceRefresh: function(num) {
        Store.set('favorites.' + num + '.next_check', 0);
        Store.set('favorites.' + num + '.last_interval', window.config.favorites.interval_min);
        if(!this.busy) this.reset();
    },
    deleted: function(num) {
        //favorites.deleted_behavior int 0-не удалять, 1-удалять сразу, 2-проверять перед удалением
        var behavior = Store.get('favorites.deleted_behavior', 2);
        var path = 'favorites.' + num + '.deleted';

        if(behavior == 1) return this.remove(num);
        if(behavior == 2 && Store.get(path, false)) return this.remove(num);

        Store.set(path, true);
        this.resetNewPosts(num);
        this.render_deleted(num);
        this.setNextCheck(num, window.config.favorites.interval_del_recheck);

        Gevent.emit('fav.deleted', num);
    },
    setLastPost: function(arr, num) {
        if(!num) num = this.current;
        var last = 0;
        var len = arr.length;
        for(var i=0;i<len;i++) {
            if(arr[i]['num'] > last) last = arr[i]['num'];
        }
        if(!last) return;

        Store.set('favorites.' + num + '.last_post', parseInt(last));
    },
    setLastSeenPost: function(thread, last) {
        if(!last) return Store.del('favorites.' + thread + '.last_seen');
        Store.set('favorites.' + thread + '.last_seen', last);
    },
    setNewPosts: function(count) {
        var current = this.getCurrent();
        var was = current.new_posts||0;
        current.new_posts = was+count;

        Store.set('favorites.' + this.current + '.new_posts', current.new_posts);

        if(!was) this.setLastSeenPost(this.current, current.last_post);
        this.render_newposts(this.current, current.new_posts);
        Gevent.emit('fav.newposts', [this.current, current.new_posts]);
    },
    resetNewPosts: function(num) {
        if(!this.isFavorited(num)) return;
        Store.set('favorites.' + num + '.new_posts', 0);
        if(!this.busy) this.reset();

        this.setLastSeenPost(this.current, 0);
        this.render_reset_newposts(num);
        Gevent.emit('fav.reset_newposts', num);
    },
    lock: function(num) {
        if(!num) num = this.current;
        var lock_time = Math.floor((+new Date)/1000)+window.config.favorites.interval_lock;

        Store.set('favorites.' + num + '.lock', lock_time);
    },
    unlock: function(num) {
        if(!num) num = this.current;

        Store.del('favorites.' + num + '.lock');
    },
    isLocked: function(num) {
        if(!num) num = this.current;
        var max_lock_time = Math.floor((+new Date)/1000);
        var current_lock = Store.get('favorites.' + num + '.lock', 0);

        return current_lock > max_lock_time;
    },
    show: function() {
        Store.set('styling.qr-fav.visible', true);

        this.render_show();
    },
    hide: function() {
        Store.del('styling.qr-fav.visible');

        this.render_hide();
    },
    debug: function() {
        var favlist = Store.get('favorites', {});

        for(var key in favlist) {
            console.log(key + ':' + Math.round(favlist[key].next_check-((+new Date)/1000)) + 's');
        }
    },

    render_get_html: function(num, thread) {
        var thread_row = '<div id="fav-row' + num + '" class="fav-row">';
        //добавочно класс fav-row-deleted если тред удалён
        //добавочно класс fav-row-updated если есть новые посты

        thread_row += '<span class="fav-row-remove" data-num="' + num + '"></span>'; //кнопка для удаления треда из списка
        thread_row += '<span class="fav-row-update" id="fav-row-update' + num + '" data-num="' + num + '"></span>'; //кнока для проверки новых постов
        thread_row += '<span class="fav-row-refreshing" id="fav-row-refreshing' + num + '" style="display: none"></span>';
        if(thread.new_posts) {
            thread_row += '<span class="fav-row-newposts" id="fav-row-newposts' + num + '">(' + thread.new_posts + ')</span>';
        } else {
            thread_row += '<span class="fav-row-newposts" id="fav-row-newposts' + num + '"></span>';
        }
        thread_row += '<a href="/' + thread.board + '/res/' + num + '.html#' + (thread.last_seen||thread.last_post) + '" id="fav-row-href' + num + '" class="fav-row-href' + (thread.new_posts?' fav-row-updated':'') + (thread.deleted?' fav-row-deleted':'') + '">';
        thread_row += '<span class="fav-row-board">/' + thread.board + '/</span>';
        thread_row += '<span class="fav-row-num">' + num + '</span>';
        thread_row += '<span class="fav-row-dash"> - </span>';
        thread_row += '<span class="fav-row-title">' + (thread.title||'<i>Без названия</i>') + '</span>';
        thread_row += '</a>';
        thread_row += '</div>';

        return thread_row;
    },
    render_remove: function(num) {
        $('#fav-row' + num).remove();
        this.render_switch(num, false);
    },
    render_add: function(num, data) {
        var html = this.render_get_html(num, data);
        $('#qr-fav-body').append(html);
        this.render_switch(num, true);
    },
    render_switch: function(num, favorited) {
        /*var button = '<span class="fav-thread-button">[<span class="fav-thread-star a-link-emulator" alt="Добавить в избранное">Отслеживать</span>]</span>';
        if(favorited) button = '<span class="fav-thread-button">[<span class="fav-thread-star a-link-emulator" alt="Удалить из избранного">Не отслеживать</span>]</span>';
        $('.fav-thread-button').replaceWith(button);*/
        var star = $('#fa-star' + num);
        if(favorited) {
            star.addClass('fa-star');
            star.removeClass('fa-star-o');
        }else{
            star.removeClass('fa-star');
            star.addClass('fa-star-o');
        }
    },
    render_refreshing: function(num) {
        $('#fav-row-refreshing' + num).show();
        $('#fav-row-update' + num).hide();
    },
    render_refreshing_done: function(num) {
        $('#fav-row-refreshing' + num).hide();
        $('#fav-row-update' + num).show();
    },
    render_newposts: function(num, posts) {
        $('#fav-row-href' + num).addClass('fav-row-updated');
        $('#fav-row-newposts' + num).html('(' + posts + ')');
    },
    render_reset_newposts: function(num) {
        $('#fav-row-href' + num).removeClass('fav-row-updated');
        $('#fav-row-newposts' + num).html('');
    },
    render_deleted: function(num) {
        $('#fav-row-href' + num).addClass('fav-row-deleted');
    },
    render_show: function() {
        this.visible = true;
        $('#qr-fav').show();
    },
    render_hide: function() {
        this.visible = false;
        $('#qr-fav').hide();
    },

    init: function() {
        var current_favorited = window.thread.id&&this.isFavorited(window.thread.id);
        if(current_favorited) {
            this.resetNewPosts(window.thread.id);
            Gevent.on('fav.preExecuteCheck', function(num){
                if(num == window.thread.id) Gevent.emit('fav.abortExec' + window.thread.id);
            });
        }

        var that = this;
        $('.thread').each(function(el){
            var num = $(this).attr('id').substr(7);
            if(Favorites.isFavorited(num)) that.render_switch(num, true);
        });

        this.reset();
    },

    _send_fav: function(num) {
        if(!Store.get('godmode.send_fav', true)) return;
        //$.get('/makaba/makaba.fcgi?task=update&action=favorites&board=' + window.board + '&thread=' + num);
    }
};
window.Settings = {
    categories: [],
    settings: {},
    editors: {},
    visible: false,
    _editor_onsave: null,

    reload: function() {
        var that = this;
        var body = $('#settings-body');
        body.html('');

        this.renderCategories(body, function(cat, cat_body){
            that.renderSettings(cat, cat_body);
        });
    },

    addCategory: function(id, name) {
        this.categories.push([id, name]);
        this.settings[id] = {};
    },
    addSetting: function(category, path, obj) {
        this.settings[category][path] = obj;
    },
    getSetting: function(category, path) {
        return this.settings[category][path];
    },

    addEditor: function(name, showcb, savecb) {
        this.editors[name] = [showcb, savecb];
    },

    renderCategories: function(body, cb) {
        var that = this;
        for(var i=0;i<this.categories.length;i++) (function(i){
            var cat = that.categories[i];

            var btn_expand = $('<span class="settings-category-switch settings-category-expand">+</span>');
            var btn_contract = $('<span class="settings-category-switch settings-category-contract" style="display: none">-</span>');
            var cat_label = $('<div class="settings-category-name">' + cat[1] + '</div>');
            var cat_body = $('<div class="settings-category" id="settings-category' + cat[0] + '" style="display: none"></div>');

            cat_label.prepend(btn_contract);
            cat_label.prepend(btn_expand);
            body.append(cat_label);
            body.append(cat_body);

            cat_label.click(function(){
                cat_body.toggle();
                btn_contract.toggle();
                btn_expand.toggle();
            });

            cb(cat[0], cat_body);
        })(i);
    },
    renderSettings: function(cat_id, cat_el) {
        for(var key in this.settings[cat_id]) {
            if(!this.settings[cat_id].hasOwnProperty(key)) continue;
            var setting = this.settings[cat_id][key];

            var setting_row = $('<div class="settings-setting-row"></div>');
            var setting_label = $('<span class="settings-setting-label">' + setting.label + '</span>');

            if(setting.multi) {
                var select_box = $('<select class="settings-setting-multibox mselect"></select>');
                select_box.data('path', key);
                select_box.data('category', cat_id);

                for(var i=0;i<setting.values.length;i++) {
                    select_box.append('<option value="' + setting.values[i][0] + '">' + setting.values[i][1] + '</option>');
                }

                select_box.val(Store.get(key, setting.default));

                setting_label.append(select_box);
                setting_row.append(setting_label);
                cat_el.append(setting_row);
            }else{
                var checkbox = $('<input type="checkbox" class="settings-setting-checkbox"/>');
                checkbox.data('path', key);
                checkbox.data('category', cat_id);
                checkbox.prop("checked", !!Store.get(key, setting.default));

                setting_label.prepend(checkbox);
                setting_row.append(setting_label);
                cat_el.append(setting_row);
            }


            //////////////////// editor ////////////////
            if(setting.hasOwnProperty('edit')) (function(that, setting){
                var edit = setting.edit;
                var edit_btn = $('<span class="setting-edit-btn a-link-emulator" title="' + edit.label + '"></span>');

                edit_btn.click(function() {
                    if(!that.editors.hasOwnProperty(edit.editor)) return false;
                    that._editor_onsave = Settings.editors[edit.editor][1];
                    that._editor_show = Settings.editors[edit.editor][0];
                    that._editor_path = edit.path;
                    that._editor_default_val = edit.default;

                    var val = Store.get(edit.path, edit.default);
                    $('#settings-btn-save').click();

                    if(edit.hasOwnProperty('importable')) {
                        $('#setting-editor-btn-export').show();
                        $('#setting-editor-btn-import').show();
                    }else{
                        $('#setting-editor-btn-export').hide();
                        $('#setting-editor-btn-import').hide();
                    }

                    if(edit.hasOwnProperty('saveable')) {
                        $('#setting-editor-btn-save').show();
                    }else{
                        $('#setting-editor-btn-save').hide();
                    }

                    $('#setting-editor-title').html(edit.title);
                    $('#setting-editor-body').html('');

                    $('#setting-editor-window').show();

                    that.editors[edit.editor][0](val, edit.path, edit.default);

                    return false;
                });

                setting_row.append(edit_btn);
            })(this, setting);
            ////////////////////////////////////////////////
        }
    },

    toggle: function() {
        if(this.visible) {
            this.hide();
        }else{
            this.show();
        }
    },
    show: function() {
        this.reload();
        $('#settings-window').show();
        this.visible = true;
    },
    hide: function() {
        $('#settings-window').hide();
        this.visible = false;
    }
};
window.Gevent = {
    last_id: 1,
    listeners: {},
    expire_time: 1000, //сколько ms считать событие валидным

    init: function() {
        if(typeof(localStorage) == 'undefined') return; //todo cookie
        if(!localStorage.gevent_last || !localStorage.gevents) {
            localStorage.gevents = "[]";
            localStorage.gevent_last = 1;
            return;
        }
        this.last_id = localStorage.gevent_last;

        this._deleteExpired();

        var that = this;
        window.addEventListener('storage', function(e){
            if(e.key != 'gevent_last') return;
            if(e.newValue <= that.last_id) return;

            that._changed(localStorage.gevent_last, localStorage.gevents);
        }, false);
    },

    _deleteExpired: function() {
        try { //удаляем протухшие эвенты
            var events = JSON.parse(localStorage.gevents);
            var initial_len = events.length;
            var random_delta = (Math.random()*(10*this.expire_time)+(10*this.expire_time)); //рандомное время чтоб 15 вкладок не схватили

            for(var i=0;i<events.length;i++) {
                var event = events[i];
                var etime = event[1];
                if(((+new Date)-etime) > random_delta) {
                    events.splice(i,1);
                    i--;
                }
            }

            if(initial_len != events.length) localStorage.gevents = JSON.stringify(events);
        }catch(e){}
    },

    on: function(name, callback) {
        if(!this.listeners.hasOwnProperty(name)) this.listeners[name] = [];
        this.listeners[name].push(callback);

        return callback;
    },

    off: function(name, callback) {
        if(!callback) throw new Error('Gevent.off no callback passed');
        if(!this.listeners.hasOwnProperty(name)) return false;
        var index = this.listeners[name].indexOf(callback);
        if(index < 0) return false;
        this.listeners[name].splice(index,1);

        return true;
    },

    once: function(name, callback) {
        var that = this;
        var proxycb = function(msg){
            that.off(name, proxycb);
            callback(msg);
        };
        this.on(name, proxycb);

        return proxycb;
    },

    onceNtemp: function(name, time, callback, timeout_callback) {
        var that = this;

        var proxy_cb;
        var timeout_timer = setTimeout(function(){
            that.off(name, proxy_cb);
            if(timeout_callback) timeout_callback();
        }, time);

        proxy_cb = this.once(name, function(msg) {
            clearTimeout(timeout_timer);
            callback(msg);
        });

        return proxy_cb;
    },

    emit: function(name, msg) {
        if(typeof(localStorage) == 'undefined') return; //todo cookie
        if(!msg) msg = "";
        this.last_id++;
        var events = JSON.parse(localStorage.gevents);
        events.push([this.last_id, (+new Date), name, msg]);
        //console.log('emit Gevent: ' +  this.last_id + ', ' + (+new Date) + ', ' + name + ', ' + msg); //todo -debug

        localStorage.gevents = JSON.stringify(events);
        localStorage.gevent_last = this.last_id;

        this._watchExpire(this.last_id);
    },

    _watchExpire: function(id) { //убираем за собой. Что не успеем убрать, уберёт init
        var that = this;
        setTimeout(function(){
            that._removeExpired(id);
        }, this.expire_time);
    },

    _removeExpired: function(id) {
        var events = JSON.parse(localStorage.gevents);
        var old_len = events.length;

        for(var i=0;i<events.length;i++) {
            var event = events[i];
            var eid = event[0];
            if(eid == id) {
                events.splice(i,1);
            }
        }
        if(events.length == old_len) return; //не нашли

        localStorage.gevents = JSON.stringify(events);
    },

    _changed: function(gevent_last, json) {
        if(gevent_last == this.last_id) return;
        var events = JSON.parse(json);
        events.sort(function(a,b){
            return a.id-b.id;
        });

        for(var i=0;i<events.length;i++) {
            var event = events[i];
            var eid = event[0];
            var etime = event[1];
            if(eid <= this.last_id) continue;
            if((+new Date)-etime > this.expire_time) continue;

            this._handleEvent.apply(this, event);
        }
    },

    _handleEvent: function(id, time, name, msg) {
        this.last_id = id;
        if(!this.listeners.hasOwnProperty(name)) return;
        var list = this.listeners[name];

        //console.log('recv Gevent: ' + id + ', ' + time + ', ' + name + ', ' + msg); //todo -debug

        //фикс неприятной штуки с удалением .once из массива, над которым работает for
        var list_copy = [];
        for(var i=0;i<list.length;i++) list_copy.push(list[i]);

        for(var j=0;j<list_copy.length;j++) list_copy[j](msg);
    }
}; //МЕЖОКНОВЫЕ эвенты
(function(){
    var posts = {};
    //thread        - number, ID треда, в котором находится пост
    //threadPosts   - array, массив номеров постов в треде
    //repliesTo     - array, массив номеров постов, на которые отвечает пост
    //replies       - array, массив номеров постов, которые отвечают на пост
    //rendered      - bool, true, если пост есть на странице
    //ajax          - object, если поста нет на странице, а мы его получили по ajax, то тут будет объект из JSON
    //notfound      - bool, true, если мы запрашивали тред, а пост там не нашли
    //el            - object, элемент поста jquery. Создаётся и возвращается el() для кэширования
    //preloaded     - number, последний загруженный (не isGhost) num поста
    //downloadCallbacks - array, массив коллбеков, вызываемых после загрузки. Присутствие этого свойства, означает, что тред в процессе загрузки
    //cache         - object, объект кэшированных icon,email,name,trip,subject,comment (если отрендерен и нет ajax)

    var PostQuery = function(num) {
        this.num = parseInt(num);

        return this;
    };

    PostQuery.prototype = {
        setThread: function(num, rendered) {
            num = parseInt(num);
            if(!posts.hasOwnProperty(this.num)) posts[this.num] = {}; //спорный момент
            var post = posts[this.num];
            var thread = posts[num];
            if(rendered) {
                post.rendered = true;
                if(window.thread.id && (!thread.preloaded || this.num > thread.preloaded)) thread.preloaded = this.num;
            }
            if(post.thread) return this;
            post.thread = num;

            if(!posts.hasOwnProperty(post.thread)) Post(post.thread).setThread(post.thread); //если какой-то пост в треде ссылается на пост из другого треда, о котором мы ничего не знаем
            if(!posts[post.thread].hasOwnProperty('threadPosts')) posts[post.thread].threadPosts = [];

            ////////////////////// сортируем новый пост, ибо кто-то ленивый не может это сделать в сервере и по JSONу они приходят вразброс
            var sorted = posts[post.thread].threadPosts;
            var slen = sorted.length;
            var min = sorted[0];
            var max = sorted[slen-1];

            if(!slen || this.num <= min) {
                sorted.unshift(this.num);
            } else if(this.num >= max) {
                sorted.push(this.num);
            } else {
                for(var i=1;i<slen;i++) {
                    if(this.num < sorted[i]) {
                        sorted.splice(i, 0, this.num);
                        break;
                    }
                }
            }
            //////////////////////

            return this;
        },
        getThread: function() {
            var post = posts[this.num];
            return post.thread;
        },
        isThread: function() {
            var post = posts[this.num];
            return this.num == post.thread;
        },
        threadPosts: function() {
            var post = posts[this.num];

            return posts[post.thread].threadPosts;
        },
        last: function() {
            var posts = this.threadPosts();
            this.num = posts[posts.length-1];

            return this;
        },
        exists: function() { //не забудь про isGhost()
            return posts.hasOwnProperty(this.num);
        },
        previewHTML: function() {
            var num = this.num;
            var post = posts[num];
            var html;

            if(post.rendered) {
                if(this.isThread()){
                    html = $('#post-' + num + ' .post').html();
                }else{
                    html = $('#post-' + num + ' .reply').html();
                }
            }else if(post.ajax) {
                html = generatePostBody(post.ajax); //нет времени делать лучше
            }else if(post.notfound){
                html = 'Пост не был найден. Удалён или что-то сломалось.';
            }else{
                html = 'DEBUG_UNDEFINED_STATE';
            }

            return html;
        },
        download: function(callback) {
            var post = posts[this.num];
            var thread = posts[post.thread];
            var from = thread.preloaded ? thread.preloaded+1 : post.thread;
            var that = this;
            if(!thread.hasOwnProperty('downloadCallbacks')) {
                thread.downloadCallbacks = [];
                if(callback) thread.downloadCallbacks.push(callback);
            }else{
                if(callback) thread.downloadCallbacks.push(callback);
                return this;
            }

            var process_callbacks = function(param) {
                var callbacks = thread.downloadCallbacks;

                setTimeout(function(){ //чтоб чужие ошибки не сломали нам delete
                    for(var i=0;i<callbacks.length;i++) callbacks[i](param);
                }, 1);

                delete thread.downloadCallbacks;
            };

            this._fetchPosts(from, function(res) {
                if(res.hasOwnProperty('error')) return process_callbacks(res);
                if(res.length) return process_callbacks({updated:0, list:[], data:[], favorites:res.favorites});

                var postsCB = [];
                var tmpost = Post(1);

                $.each( res.data, function( key, val ) {
                    tmpost.num = val.num;
                    tmpost.setThread(post.thread).setJSON(val); //пусть будет, нам не жалко

                    if(!thread.preloaded || val.num > thread.preloaded) thread.preloaded = parseInt(val.num);
                    postsCB.push(val.num);
                });

                that._findRemovedPosts();

                process_callbacks({updated:res.data.length, list:postsCB, data:res.data, favorites:res.favorites});
            });

            return this;
        },
        _fetchPosts: function(param, callback) { //очень кривокод
            var board;
            var thread;
            var from_post;

            if(typeof(param) == 'object') {
                from_post = param.from_post;
                thread = param.thread;
                board = param.board;
            }else{
                var post = posts[this.num];
                from_post = param;
                thread = post.thread;
                board = window.thread.board;
            }

            var onsuccess = function( data ) {
                if(data.hasOwnProperty('Error')) return callback({error:'server', errorText:'API ' + data.Error + '(' + data.Code + ')', errorCode:data.Code});
                var posts = [];
                try {
                    var parsed = JSON.parse(data);
                    var all_posts = parsed['threads'][0]['posts'];
                    for(var i=0;i<all_posts.length;i++) {
                        var post = all_posts[i];
                        if(post.num >= from_post) posts.push(post);
                    }
                }catch(e){
                    return callback({error:'server', errorText: 'Ошибка парсинга ответа сервера', errorCode: -1});
                }

                callback({data:posts, favorites: all_posts[0]['favorites']});
            };
            var onerror = function(jqXHR, textStatus) {
                if(jqXHR.status == 404) return callback({error:'server', errorText: 'Тред не найден', errorCode: -404});
                if(jqXHR.status == 0) return callback({error:'server', errorText: 'Браузер отменил запрос (' + textStatus + ')', errorCode: 0});
                callback({error:'http', errorText:textStatus, errorCode: jqXHR.status});
            };

            //$.ajax( '/makaba/mobile.fcgi?task=get_thread&board=' + board + '&thread=' + thread + '&num=' + from_post, {
            $.ajax( '/' + board + '/res/' + thread + '.json', {
                dataType: 'html',
                timeout: window.config.updatePostsTimeout,
                success: onsuccess,
                error: onerror
            });

            return this;
        },
        _findRemovedPosts: function() {
            var post = posts[this.num];
            var thread = posts[post.thread];
            if(!thread.preloaded) throw new Error('_findRemovedPosts вызван для !preloaded треда. Ошибка выше в коде');

            var tmp = Post(1);
            $.each( thread.threadPosts, function( key, val ) { //все не найденные отмечаем в notfound
                tmp.num = val; //создавать новый Post в 13 раз медленнее
                if(tmp.isGhost()) tmp._notFound();
            });
        },
        isAjax: function() {
            var post = posts[this.num];

            return post.hasOwnProperty('ajax');
        },
        isRendered: function() {
            var post = posts[this.num];

            return !!post.rendered;
        },
        isGhost: function() { //это означает, что мы ничего проме треда и номера не знаем о посте.
            var post = posts[this.num];

            return !post.hasOwnProperty('ajax') && !post.rendered && !post.notfound;
        },
        isThreadPreloaded: function() {
            var post = posts[this.num];
            var thread = posts[post.thread];

            return thread.hasOwnProperty('preloaded');
        },
        _notFound: function() {
            var post = posts[this.num];

            post.notfound = true;

            return this;
        },
        isNotFound: function() {
            var post = posts[this.num];

            return post.notfound;
        },
        setJSON: function(obj, rendered) {
            var post = posts[this.num];
            if(rendered){
                post.rendered = true;
            }else{
                post.ajax = obj;
            }

            this._processRepliesHTML(obj.comment);

            return this;
        },
        getJSON: function() {
            var post = posts[this.num];

            if(!post.hasOwnProperty('ajax')) return false;

            return post.ajax;
        },
        _processRepliesHTML: function(html) { //"системная" функция, не вызыйте её если не знаете что делаете
            var tmp = Post(1);

            if(html.indexOf('<a onclick="highlight(') >= 0) { //todo старый формат, удалить после вайпа
                var match = html.match(/highlight\([0-9]*\)" href="[^"]*[0-9]*.html#[0-9]*"/g);
                var that = this;

                $.each(match, function(k,v){
                    var replyMatch = v.match(/highlight\([0-9]*\)" href="[^"]*\/res\/([0-9]*).html#([0-9]*)"/);
                    if(replyMatch && replyMatch.hasOwnProperty('2')) {
                        var thread_num = replyMatch[1];
                        var num = replyMatch[2];
                        that.addReplyTo(num);
                        tmp.num = num;
                        tmp.setThread(thread_num).addReply(that.num);
                    }
                });
            }

            if(html.indexOf('class="post-reply-link"') >= 0) {
                var match = html.match(/class="post-reply-link" data-thread="([0-9]*)" data-num="([0-9]*)"/g);
                var that = this;

                $.each(match, function(k,v){
                    var replyMatch = v.match(/class="post-reply-link" data-thread="([0-9]*)" data-num="([0-9]*)"/);
                    if(replyMatch && replyMatch.hasOwnProperty('2')) {
                        var thread_num = replyMatch[1];
                        var num = replyMatch[2];
                        that.addReplyTo(num);
                        tmp.num = num;
                        tmp.setThread(thread_num).addReply(that.num);
                    }
                });
            }
        },
        _processRepliesElements: function(el) { //"системная" функция, не вызыйте её если не знаете что делаете
            var tmp = Post(1);
            var that = this;

            el.find('.post-reply-link').each(function(){
                var this_el = $(this);
                var thread_num = this_el.data('thread');
                var num = this_el.data('num');
                that.addReplyTo(num);
                tmp.num = num;
                tmp.setThread(thread_num).addReply(that.num);
            });
        },
        addReplyTo: function(reply_to_num) {
            var post = posts[this.num];
            if(!post.hasOwnProperty('repliesTo')) post.repliesTo = [];
            post.repliesTo.push(reply_to_num);

            return this;
        },
        addReply: function(reply_num) {
            var post = posts[this.num];
            if(!post.hasOwnProperty('replies')) post.replies = [];
            if(post.replies.indexOf(reply_num) >= 0) return this;

            post.replies.push(reply_num);
            this._renderReply(reply_num);

            return this;
        },
        getReplyLinks: function() {
            var post = posts[this.num];
            var text = '';
            if(!post.hasOwnProperty('replies')) return text;

            for(var i=0;i<post.replies.length;i++) {
                text += this._generateReplyLink(post.replies[i]);
            }

            return text;
        },
        _generateReplyLink: function(reply_num) {
            var reply_thread = posts[reply_num].thread;

            return  '<a ' +
                'class="post-reply-link" ' +
                'data-num="' + reply_num + '" ' +
                'data-thread="' + reply_thread + '" ' +
                'href="/' + window.thread.board + '/res/' + reply_thread + '.html#' + reply_num + '">' +
                '&gt;&gt;' + reply_num +
                '</a> ';
        },
        _renderReply: function(reply_num) {
            var post = posts[this.num];

            if(post.rendered) {
                var refmap = $('#refmap-' + this.num);
                var link = this._generateReplyLink(reply_num);
                refmap.css('display','block');
                refmap.append(link);
            }
        },
        el: function() {
            var post = posts[this.num];
            if(!post.el) post.el = $('#post-' + this.num);

            return post.el;
        },
        hide: function(store, reason) {
            if(this.isThread()) {
                this._renderHideThread(reason);
            }else{
                this._renderHidePost(reason);
            }

            if(store) this._storeHide();

            return this;
        },
        unhide: function() {
            if(this.isThread()) {
                this._renderUnHideThread();
            }else{
                this._renderUnHidePost();
            }

            this._storeUnHide();

            return this;
        },
        _storeHide: function() {
            Store.set('board.' + window.thread.board + '.hidden.' + this.num, getTimeInDays());

            return this;
        },
        _storeUnHide: function() {
            Store.del('board.' + window.thread.board + '.hidden.' + this.num);

            return this;
        },
        _renderHideThread: function(reason) {
            var num = this.getThread();
            var post = Post(num);
            var el = $('#thread-' + num);
            var title = post.getTitle();

            var hiddenBox = $('<div></div>');
            hiddenBox.addClass('reply');
            hiddenBox.addClass('hidden-thread-box');
            hiddenBox.attr('id', 'hidden-thread-n' + num);
            hiddenBox.data('num', num);
            hiddenBox.html('Скрытый тред <span class="hidden-thread-num">№'+ num + '</span><i> (' + title + ')</i>');
            if(reason) hiddenBox.append('<span class="post-hide-reason">(' + reason + ')</span>');

            el.before(hiddenBox);
            //document.getElementById('thread-' + num).style.display = 'none';
            el.hide();
        },
        _renderUnHideThread: function() {
            var num = this.getThread();
            var el = $('#thread-' + num);

            $('#hidden-thread-n' + num).remove();
            el.show();
            //document.getElementById('thread-' + num).style.display = 'block';
        },
        _renderHidePost: function(reason) {
            var el = this.el();
            el.hide();

            var wrapper = $('<div></div>');
            wrapper.addClass('post-wrapper');
            wrapper.addClass('hidden-p-box');
            wrapper.attr('id', 'hidden-post-n' + this.num);
            wrapper.data('num', this.num);

            var hiddenBox = $('<div></div>');
            hiddenBox.addClass('reply');
            hiddenBox.addClass('hidden-post-box');

            var boxHTML = $('#post-details-' + this.num).clone();
            boxHTML.removeAttr('id');
            boxHTML.find('.turnmeoff').remove();
            boxHTML.find('.postpanel').remove();
            boxHTML.find('.ABU-refmap').remove();
            boxHTML.find('.reflink').remove();
            boxHTML.append('№' + this.num);
            if(reason) boxHTML.append('<span class="post-hide-reason">(' + reason + ')</span>');

            hiddenBox.html(boxHTML);
            wrapper.html(hiddenBox);

            el.before(wrapper);
        },
        _renderUnHidePost: function() {
            var el = this.el();

            $('#hidden-post-n' + this.num).remove();
            el.show();
        },
        highlight: function() {
            $('.hiclass').removeClass('hiclass');
            $('#post-body-' + this.num).addClass('hiclass');
        },
        getTitle: function() {
            var element = this.el();
            var title = $.trim(element.find('.post-title').text());
            if(!title) title = $.trim(element.find('.post-message:first').text());
            if(title.length > 50) title = title.substr(0,50) + '...';

            return escapeHTML(title);
        },
        raw: function() { //мало ли кому это надо будет. Я у мамы заботливый
            return posts[this.num];
        },
        _cGet: function(objparam, htmlclass) {
            var post = posts[this.num];
            if(post.hasOwnProperty('ajax')) return post.ajax[objparam];
            if(!post.rendered) throw new Error('Вызов oGet для поста без ajax||rendered. Ошибка выше по коду.');
            if(!post.hasOwnProperty('cache')) post.cache = {};
            if(!post.cache.hasOwnProperty(objparam) && htmlclass) post.cache[objparam] = this.el().find('.' + htmlclass).html();

            return post.cache[objparam];
        },
        _cCacheNameMail: function() {
            var post = posts[this.num];
            if(post.hasOwnProperty('ajax')) return;
            if(!post.rendered) throw new Error('Вызов oCacheNameMail для поста без ajax||rendered. Ошибка выше по коду.');
            if(!post.hasOwnProperty('cache')) post.cache = {};
            if(post.cache.hasOwnProperty('name') || post.cache.hasOwnProperty('email')) return;

            var name_el = this.el().find('.ananimas');
            if(name_el.length) {
                post.cache.name = name_el.html();
                post.cache.email = null;
            }else{
                var el = this.el().find('.post-email');
                post.cache.name = el.html();
                post.cache.email = el.attr('href');
            }
        },
        cGetIcon:function() {
            return this._cGet('icon', 'post-icon');
        },
        cGetEmail:function() {
            this._cCacheNameMail();
            return this._cGet('email');
        },
        cGetName:function() {
            this._cCacheNameMail();
            return this._cGet('name');
        },
        cGetTrip:function() {
            return this._cGet('trip', 'postertrip');
        },
        cGetSubject:function() {
            return this._cGet('subject', 'post-title');
        },
        cGetComment:function() {
            return this._cGet('comment', 'post-message');
        }
    };

    window.Post = function(num) {
        num = parseInt(num);
        return (new PostQuery(num));
    };
})(); //Карта постов
(function(){
    var conf_loaded = false;
    var dom_ready = false;
    var conf_queue = [];
    var dom_queue = [];
    var debug_html = '';

    window.loadInitialConfig = function(cfg) {
        window.thread.id = cfg.thread_num; //ID текущего треда
        window.thread.board = cfg.board; //имя текущего раздела
        window.thread.hideTimeout = 7;  //сколько дней хранить скрытые треды/посты

        conf_loaded = true;
        for(var i=0;i<conf_queue.length;i++) bmark.apply(this, conf_queue[i]);
        conf_queue = [];
    };

    $(function(){
        $('body').append('<div id="bmark_debug" style="display: none">' + debug_html + '</div>');

        dom_ready = true;
        for(var i=0;i<dom_queue.length;i++) bmark.apply(this, dom_queue[i]);
        dom_queue = [];
        debug_html = '';
    });

    window.Stage = function(name, id, type, cb){
        if(Store.get('debug_disable_stage.' + id, false)) return;
        if(type == Stage.INSTANT) {
            name = '[I]' + name;
            bmark(name, cb);
        }else if(type == Stage.CONFLOAD) {
            name = '[C]' + name;
            if(conf_loaded) {
                bmark(name, cb);
            }else{
                conf_queue.push([name, cb]);
            }
        }else if(type == Stage.DOMREADY) {
            name = '[D]' + name;
            if(dom_ready) {
                bmark(name, cb);
            }else{
                dom_queue.push([name, cb]);
            }
        }else if(type == Stage.ASYNCH) {
            name = '[A]' + name;
            setTimeout(function(){
                bmark(name, cb);
            },1);
        }
    };

    var bmark = function(name, cb) {
        var start = (+new Date);

        try {
            cb();
        } catch(err) {
            append_debug('<span style="color:#FF0000">На шаге "' + name + '" произошла ошибка:<br>' +
                '<pre>' +
                err + '\n'+
                err['stack'] +
                '</pre>' +
                '</span>');
            return false;
        }

        var end = (+new Date);
        var delta = end-start;

        append_debug(delta + 'ms) ' + name + '<br>');
    };

    var append_debug = function(text) {
        if(dom_ready) {
            $('#bmark_debug').append(text);
        }else{
            debug_html += text;
        }
    };

    Stage.INSTANT = 1;
    Stage.CONFLOAD = 2;
    Stage.DOMREADY = 3;
    Stage.ASYNCH = 4;
})(); //Загрузчик
$.fn.clearValue = function(){
    return this.each(function(){
        var el = $(this);
        el.wrap('<form>').closest('form').get(0).reset();
        el.unwrap();
    });
};

Stage('Загрузка window.Gevent',                 'gevent',       Stage.INSTANT,      function(){
    Gevent.init();

    Gevent.on('fav.add', function(arg){
        Favorites.render_add(arg[0], arg[1]);
    });
    Gevent.on('fav.remove', function(num){
        Favorites.render_remove(num);
    });
    Gevent.on('fav.reset_newposts', function(num){
        Favorites.render_reset_newposts(num);
    });
    Gevent.on('fav.newposts', function(arg){
        Favorites.render_newposts(arg[0], arg[1]);
    });
    Gevent.on('fav.reset_deleted', function(num){
        Favorites.render_deleted(num);
    });
});
Stage('Загрузка хранилища',                     'store',        Stage.INSTANT,      function(){
    Store.init()
});
Stage('Загрузка Media провайдеров',             'media',        Stage.INSTANT,      function(){
    Media.add('youtube', 'youtube.com', "https?://(?:www\\.)?(?:youtube\\.com/).*(?:\\?|&)v=([\\w-]+)", {id: 1});
    Media.add('youtube', 'youtu.be', "https?://(?:www\\.)?youtu\\.be/([\\w-]+)", {id: 1});
    Media.add('vimeo', 'vimeo.com', "https?://(?:www\\.)?vimeo\\.com/([\\d]+)", {id: 1});
    Media.add('liveleak', 'liveleak.com', "https?://(?:www\\.)?(?:liveleak\\.com/).*(?:\\?|&)i=([\\w]+_\\d+)", {id: 1});
    Media.add('dailymotion', 'dailymotion.com', "https?://(?:www\\.)?dailymotion\\.com/video/([\\w]+)", {id: 1});
    Media.add('vocaroo', 'vocaroo.com', "https?://(?:www\\.)?vocaroo\\.com/i/([\\w]+)", {id: 1});
    Media.add('twitter', 'twitter.com', "https?://(?:www\\.)?twitter\\.com/.+/status/([\\d]+).*", {id: 1});

    Media.addGenerator('youtube', function(obj, cb){
        cb('<iframe src="//www.youtube.com/embed/' + obj.id + '?autoplay=1" width="640" height="360" frameborder="0" allowfullscreen></iframe>');
    });
    Media.addGenerator('vimeo', function(obj, cb){
        cb('<iframe src="//player.vimeo.com/video/' + obj.id + '?autoplay=1" width="640" height="360" frameborder="0" allowfullscreen></iframe>');
    });
    Media.addGenerator('liveleak', function(obj, cb){
        $.get( 'http://mobile.liveleak.com/view?i=' + obj.id + '&ajax=1', function( data ) {
            var regexp = /generate_embed_code_generator_html\('(\w+)'\)/i;
            var match = regexp.exec(data);
            if(!match || !match.hasOwnProperty('1')) return cb();
            cb('<iframe src="http://www.liveleak.com/ll_embed?f=' + match[1] + '&autostart=true" width="640" height="360" frameborder="0" allowfullscreen></iframe>');
        })
            .fail(function(){
                cb();
            });
    });
    Media.addGenerator('dailymotion', function(obj, cb){
        cb('<iframe width="640" height="360" src="//www.dailymotion.com/embed/video/' + obj.id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    });
    Media.addGenerator('vocaroo', function(obj, cb){
        cb('<object width="148" height="44"><param name="movie" value="//vocaroo.com/player.swf?playMediaID=' + obj.id + '&autoplay=1"></param><param name="wmode" value="transparent"></param><embed src="//vocaroo.com/player.swf?playMediaID=' + obj.id + '&autoplay=1" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"></embed></object>');
    });
    Media.addGenerator('twitter', function(obj, cb){
        var onsuccess = function( data ) {
            cb(data.html);
        };
        var onfail = function(){
            cb();
        };
        $.ajax( {
            url: '//api.twitter.com/1/statuses/oembed.json?align=left&lang=ru&maxwidth=700&id=' + obj.id + '&callback=?',
            dataType: 'json',
            timeout: 5000,
            success: onsuccess,
            error: onfail
        });
    });

    Media.addUnloader('twitter', function(el){
        $(el).closest('.post-message').find('.twitter-tweet').remove();
    });

    Media.addThumbnailer('youtube', function(obj){
        return '<img src="//i.ytimg.com/vi/' + obj.id + '/mqdefault.jpg" width="320" height="180">';
    });
});
Stage('Загрузка стиля',                         'styleload',    Stage.INSTANT,      function(){
    var style = Store.get('styling.style', false);
    if(style && window.config.styles[style]) {
        document.writeln('<link href="' + window.config.styles[style] + '" id="dynamic-style-link" type="text/css" rel="stylesheet">');
    }

    var custom_css = Store.get('other.custom_css', {});
    if(custom_css.hasOwnProperty('enabled') && custom_css.hasOwnProperty('data')) {
        document.writeln('<style>' + custom_css.data + '</style>');
    }
});
Stage('Загрузка системы скруллинга',            'scrollcb',     Stage.INSTANT,      function(){
    window.scrollcb_array = [];
    var timer = 0;
    var win = $(window);

    win.scroll(function(){
        if(timer) clearTimeout(timer);

        timer = setTimeout(function(){
            timer = 0;
            var pos = win.scrollTop();

            for(var i=0;i<window.scrollcb_array.length;i++) window.scrollcb_array[i](pos);
        },100);
    });
});
Stage('Определение браузера для костыля',       'browserdetect',Stage.DOMREADY,     function(){
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        window.kostyl_class = 'browser-ff';
        $('body').addClass(window.kostyl_class);
    }
});
Stage('Переключение разделов на мобилках',      'boardswitch',  Stage.DOMREADY,     function(){
    var box = $('#LakeNavForm');
    box.val('/' + window.board +  '/');
    box.change(function(){
        var newval = $(this).val();
        window.location.href = newval;
    });
});
Stage('Переключение стилей',                    'styleswitch',  Stage.DOMREADY,     function(){
    var current = Store.get('styling.style');
    var el = $('#SwitchStyles');

    var switchTo = function(theme_path) {
        var css_link = $('#dynamic-style-link');
        if(!theme_path) {
            if(css_link.length) css_link.remove();
            return;
        }

        if(!css_link.length) {
            css_link = $('<link href="' + theme_path + '" id="dynamic-style-link" type="text/css" rel="stylesheet">');
            $('head').append(css_link);

            return;
        }

        css_link.attr('href', theme_path);
    };

    var onChange = function(){
        var selected = el.val();

        if(!selected) {
            Store.del('styling.style');
        }else{
            Store.set('styling.style', selected);
            current = selected;
        }
        var path =  window.config.styles[selected];
        switchTo(path);
    };

    el.change(onChange);

    if(current) {
        el.val(current);
    }
});
Stage('Обработка и отправка постов на сервер',  'postsumbit',   Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var request;
    var busy = false;
    var qr = $('#qr');
    var forms =  $('#postform,#qr-postform');
    var submit_buttons = $('#qr-submit,#submit');

    var sendForm = function(form) {
        var formData = new FormData(form);
        busy = true;

        request = $.ajax({
            url: '/makaba/posting.fcgi?json=1',  //Server script to process data
            type: 'POST',
            dataType: 'json',
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ // Check if upload property exists
                    myXhr.upload.addEventListener('progress', progressHandling, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            //Ajax events
            success: on_send_success,
            error: on_send_error,
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });

        renderSending();
    };

    var renderSending = function(){
        /*var inputs = forms.find('input,select,textarea').not('[type=submit]');
        inputs.attr('disabled','disabled');*/
        submit_buttons.attr('value', 'Отправка...');
    };

    var renderSendingDone = function(){
        /*var inputs = forms.find('input,select,textarea').not('[type=submit]');
        inputs.removeAttr('disabled');*/
        submit_buttons.attr('value', 'Отправить');
    };

    var progressHandling = function(e) {
        var percent = 100/e.total*e.loaded;
        if(percent >= 99) return submit_buttons.attr('value', 'Обработка...');

        var bpercent = ( (Math.round(percent*100))/100 ).toString().split('.');
        if(!bpercent[1]) bpercent[1] = 0;
        bpercent = (bpercent[0].length==1?'0'+bpercent[0]:bpercent[0]) + '.' + (bpercent[1].length==1?bpercent[1]+'0':bpercent[1]);

        $('#qr-progress-bar').attr('value', e.loaded).attr('max', e.total);
        submit_buttons.attr('value', bpercent + '%');
    };

    var on_send_error = function(request) {
        if(request.statusText == 'abort') {
            $alert('Отправка сообщения отменена');
        }else{
            $alert('Ошибка постинга: ' + request.statusText);
        }

        on_complete();
    };

    var on_send_success = function(data) {
        if(data.Error) {
            if(data.Id) {
                $alert(data.Reason + '<br><a href="/ban?Id=' + data.Id + '" target="_blank">Подробнее</a>', 'wait');
            }else{
                $alert('Ошибка постинга: ' + (data.Reason || data.Error));
                if(data.Error == -5) window.postform_validator_error('captcha-value');
            }
        }else if(data.Status && data.Status == 'OK') {
            $alert('Сообщение успешно отправлено');
            if(Store.get('other.qr_close_on_send', true)) $('#qr').hide();

            if(!window.thread.id) { //костыль
                var behavior = Store.get('other.on_reply_from_main', 1);
                if(behavior == 1) {
                    window.location.href = '/' + window.board + '/res/' + $('#qr-thread').val() + '.html#' + data.Num;
                }else if(behavior == 2) {
                    expandThread(parseInt($('#qr-thread').val()), function(){
                        Post(data.Num).highlight();
                        scrollToPost(data.Num);
                    });
                }
            }else{
                var highlight_num = data.Num;
                updatePosts(function(data){
                    if(Favorites.isFavorited(window.thread.id)) Favorites.setLastPost(data.data, window.thread.id);
                    Post(highlight_num).highlight();
                });
            }
            resetInputs();
        }else if(data.Status && data.Status == 'Redirect') {
            var num = data.Target;
            $alert('Тред №' + num + ' успешно создан');

            window.location.href = '/' + window.board + '/res/' + num + '.html';
        }else{
            $alert('Ошибка постинга');
        }

        on_complete();
    };

    var on_complete = function() {
        busy = false;
        renderSendingDone();
        loadCaptcha();
    };

    var resetInputs = function() {
        $('#subject').val('');
        $('#shampoo').val('');
        $('#qr-shampoo').val('');
        $('.postform-image').clearValue().not('#image1').not('#qr-image1').attr('style','display:none');
        $('.message-byte-len').html($('#settings-comment-length').val());
    };

    var saveToStorage = function() {
        Store.set('thread.postform.name', $('#name').val());
        Store.set('thread.postform.email', $('#e-mail').val());
        var icon = $('.anoniconsselectlist').val();
        if(icon) Store.set('thread.postform.icon.' + window.thread.board, icon);
    };

    var validator_error = window.postform_validator_error = function(id, msg) {
        var el = $('#' + id);
        var qr_el = $('#qr-' + id);

        if(msg) $alert(msg);

        el.addClass('error');
        qr_el.addClass('error');
        (activeForm.attr('id') == 'qr-shampoo') ? qr_el.focus() : el.focus();
    };

    var validateForm = function(is_qr) {
        var captcha = $('#captcha-value');
        var len = unescape(encodeURIComponent($('#shampoo').val())).length;
        var max_len = parseInt($('#settings-comment-length').val());
        var image = $('#image1');

        if($('input[name=thread]').val()=='0' && image.is(':visible') && !image.val()) return $alert('Для создания треда загрузите картинку');
        if(captcha.length && !captcha.val()) return validator_error('captcha-value', 'Вы не ввели капчу');
        if(len > max_len) return validator_error('shampoo', 'Максимальная длина сообщения ' + max_len + ' <b>байт</b>, вы ввели ' + len);
        if(!len && !image.val()) return validator_error('shampoo', 'Вы ничего не ввели в сообщении');

        $('.error').removeClass('error');

        return true;
    };

    forms.on('submit', function(){
        if(typeof FormData == 'undefined') return; //старый браузер
        if(busy) return request.abort();
        var form = $(this);

        saveToStorage();
        if(validateForm(form.attr('id') == 'qr-postform')) sendForm(form[0]);

        return false;
    });

    $('#qr-cancel-upload').click(function(){
        request.abort();
    });

    resetInputs();
});
Stage('Обработка нажатий клавиш',               'keypress',     Stage.DOMREADY,     function(){
    var ctrl = false;
    $(window).keydown(function(e) {
        if(e.keyCode == 17) ctrl = true;
        if(e.keyCode == 32 && ctrl) {
            if(!Store.get('other.qr_hotkey', true)) return;
            var qr = $('#qr');
            if(qr.is(':visible')) {
                qr.hide();
            }else{
                qr.show();
                loadCaptcha();
            }
        }
    })
    .keyup(function(e) {
        if(e.keyCode == 17) ctrl = false;
    })
    .blur(function() {
        ctrl = false;
    });

    $('#qr-shampoo,#shampoo').keydown(function(e) {
        if(e.keyCode == 13 && ctrl && Store.get('old.ctrl_enter_submit', true)) {
            if(window.activeForm.attr('id') == 'qr-shampoo') {
                $('#qr-submit').click();
            }else{
                $('#submit').click();
            }
        }
    });

});
Stage('Enable debug',                           'enabledebug',  Stage.DOMREADY,     function(){
    if(!Store.get('debug',false)) return;
    $('#bmark_debug').show();
    $('.debug').removeClass('debug');
});
Stage('NSFW',                                   'nsfw',         Stage.DOMREADY,     function(){
    var enabled = Store.get('styling.nsfw',false);

    var turn_on = function() {
        enabled = true;
        $('head').append('<style type="text/css" id="nsfw-style">' +
            '.preview{opacity:0.05}' +
            '.preview:hover{opacity:1}' +
            '</style>');
    };
    var turn_off = function() {
        enabled = false;
        $('#nsfw-style').remove();
    };

    $('#nsfw').click(function(){
        if(enabled) {
            Store.del('styling.nsfw');
            turn_off();
        }else{
            Store.set('styling.nsfw',true);
            turn_on();
        }
    });

    if(enabled) turn_on();
});
Stage('DEBUG Обратная совместимость ответов',   'wakabareply',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    $('a').each(function(){
        var el = $(this);
        if(el.data('num')) return;
        var text = el.text();
        var href = el.attr('href');
        if(text.indexOf('>>') != 0) return;
        var num_pos = href.indexOf('.html#');
        if(num_pos < 0) return;
        var num = href.substr(num_pos+6);
        var thread_pos = href.indexOf('/res/');
        if(thread_pos < 0) return false;
        var thread = href.substr(thread_pos+5, (href.length-num_pos-6) );
        var board = href.substr(1, thread_pos-1);

        el.replaceWith('<a href="/' + board + '/res/' + thread + '.html#' + num + '" class="post-reply-link" data-thread="' + thread + '" data-num="' + num + '">&gt;&gt;' + num + '</a>');
    });
});
Stage('Наполнение карты постов',                'mapfill',      Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    $('.thread').each(function(){ //наполняем карту после загрузки страницы
        var thread_el = $(this);
        var thread_num = thread_el.attr('id').substr(7);
        var thread_obj = Post(thread_num);
        thread_obj.setThread(thread_num, true); //одинаковые пост и тред делают пост тредом. Жертва оптимизации
        var post_obj = Post(1);

        thread_el.find('.post').each(function(){
            var post_el = $(this);
            post_obj.num = post_el.data('num');
            post_obj.setThread(thread_num, true);
            post_obj._processRepliesElements(post_el);
        });

        if(thread_num == window.thread.id) thread_obj._findRemovedPosts(); //костыли костылики
    });
});
Stage('Мои доски',                              'myboards',     Stage.DOMREADY,     function(){
    if(!Store.get('other.myboards.enabled', true)) return;
    var postbtn_favorite_board = $('.postbtn-favorite-board');
    postbtn_favorite_board.show();
    $('.dropd-boards').show();
    if(!window.thread.id) $('.favorite-board').show();

    if(!Store.get('other.myboards.list',false)) {
        Store.set('other.myboards.list',{"b":"/Б/ред","po":"Политика и новости","mmo":"Massive multiplayer online games","vg":"Видеоигры","d":"Дискуссии о Два.ч"});
    }

    if(Store.get('other.myboards.list.' + window.board, false)) {
        postbtn_favorite_board
            .removeClass('fa-star-o')
            .addClass('fa-star');
    }

    var board_list_dropped = false;
    $('#dropd-board-btn').click(function(){
        if(board_list_dropped) {
            $('#dropd-board-list').removeClass('dropped');
        }else{
            $('#dropd-board-list').addClass('dropped');
        }
        board_list_dropped = !board_list_dropped;
    });

    $.each(Store.get('other.myboards.list',{}), function(k,v){
        $('#dropd-board-list-ul').append('<li id="dropd-board-' + k + '">' +
            '<a title="massive multiplayer online games" href="/' + k + '/">/' + k + '/ - ' + v + '</a>' +
            '</li>');
    });

    var addBoard = function() {
        var title = $.trim($('#title').text());
        postbtn_favorite_board
            .removeClass('fa-star-o')
            .addClass('fa-star');
        Store.set('other.myboards.list.' + window.board, title);
        $('#dropd-board-list-ul').append('<li id="dropd-board-' + window.board + '">' +
            '<a title="' + title + '" href="/' + window.board + '/">/' + window.board + '/ - ' + title + '</a>' +
            '</li>');
    };

    var removeBoard = function() {
        postbtn_favorite_board
            .addClass('fa-star-o')
            .removeClass('fa-star');
        Store.del('other.myboards.list.' + window.board);
        $('#dropd-board-' + window.board).remove();
    };

    postbtn_favorite_board.click(function(){
        if(Store.get('other.myboards.list.' + window.board, false)) {
            removeBoard();
        }else{
            addBoard();
        }
    });

    if(!Store.get('other.myboards.menu', false)) return;
    var boards = [];

    $.each(Store.get('other.myboards.list',{}), function(k,v){
        boards.push('<a href="/' + k + '/" title="' + v + '">' + k + '</a>');
    });

    $('.rmenu').html('Разделы: [ ' + boards.join(' / ') + ' ]');
});
Stage('Статистика тредов',                      'boardstats',   Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    //if(window.thread.id && Store.get('godmode.send_views', true)) $.get('/makaba/makaba.fcgi?task=update&action=views&board=' + window.board + '&thread=' + window.thread.id);
    if(!Store.get('other.boardstats',true)) return;

    var boardstats_header = $('#boardstats-header');
    var boardstats_update_el = $('.update-stats-box');
    var boardstats_updating_el = $('.update-stats-box-updating');
    var boardstats_toggle_btn = $('#boardstats-arrow-down');

    var busy = false;
    var timer = 0;
    var box_visible = true;
    var force_on_show = false;

    var reset = function(time, announce) {
        if(!time) time = window.threadstats.refresh;
        time = time*1000;
        if(timer) clearTimeout(timer);
        if(busy) busy = false;
        boardstats_update_el.show();
        boardstats_updating_el.hide();

        timer = setTimeout(announce_refresh, time);
        if(announce) Gevent.emit('boardstats_' + window.board + '_reset', time);
    };

    var announce_refresh = function() {
        if(!box_visible) {
            force_on_show = true;
            return reset();
        }
        busy = true;
        boardstats_update_el.hide();
        boardstats_updating_el.show();

        Gevent.onceNtemp('boardstats_' + window.board + '_abort_refresh', 1000, reset, execute_refresh);
        Gevent.emit('boardstats_' + window.board + '_announce_refresh');
    };

    var execute_refresh = function() {
        clearTimeout(timer);
        download_data(function(data){
            busy = false;
            if(!data) return reset(window.threadstats.retry);
            reset();

            Gevent.emit('boardstats_' + window.board + '_data', data);
            Store.set('boardstats.' + window.board, {time:(+new Date), data:data});

            render_data(data);
        });
    };

    var download_data = function(cb) {
        var on_error = function(){
            cb(false);
        };

        var on_success = function(data) {
            if(!data) return cb(false);
            if(!data.hasOwnProperty) return cb(false);
            if(!data.hasOwnProperty('threads')) return cb(false);

            data['threads'].sort(function(a,b){
                return b['score']-a['score'];
            });

            cb(data['threads']);
        };

        $.ajax({
            url: '/' + window.board + '/threads.json',  //Server script to process data
            type: 'GET',
            dataType: 'json',
            success: on_success,
            error: on_error,
            timeout: window.threadstats.request_timeout
        });
    };

    var render_data = function(threads) {
        var table = $('#boardstats-table');
        var rendered = 0;
        var html = '';
        table.html(html);
        for(var i=0;i<threads.length;i++) {
            var thread = threads[i];
            if(!thread) break;
            if(parseInt(thread.sticky)) continue;
            if(parseInt(thread.bump_limit)) continue;

            html += '<div class="boardstats-row">' +
                '<span class="boardstats-title"><a href="/' + window.board + '/res/' + thread.num + '.html">' + (thread.subject||'<i>Без названия</i>') + '</a></span>' +
                '<span class="boardstats-views">&nbsp;' +
                '<i class="fa fa-bar-chart"> ' + (Math.round(thread['score']*100)/100) + ' </i> ' +
                '<i class="fa fa-eye"> ' + thread['views'] + '&nbsp;&nbsp;&nbsp;</i> ' +
                '</span>';
            html += '</div>';

            rendered++;
            if(rendered >= window.threadstats.count) break;
        }
        table.html(html);
    };

    var toggle_visibility = function() {
        var current_vis = box_visible;
        box_visible = !box_visible;

        if(current_vis) {
            $('#boardstats-table').hide();
            boardstats_toggle_btn.removeClass('fa-angle-double-down');
            boardstats_toggle_btn.addClass('fa-angle-double-up');
            Store.del('boardstats.minimized');
        }else{
            $('#boardstats-table').show();
            boardstats_toggle_btn.addClass('fa-angle-double-down');
            boardstats_toggle_btn.removeClass('fa-angle-double-up');
            Store.set('boardstats.minimized', false);
            if(force_on_show) {
                force_on_show = false;
                announce_refresh();
            }
        }
    };

    boardstats_header.click(toggle_visibility);
    boardstats_update_el.click(function(){
        if(!box_visible) toggle_visibility();
        if(!busy) announce_refresh();
    });

    Gevent.on('boardstats_' + window.board + '_announce_refresh', function() {
        if(busy) Gevent.emit('boardstats_' + window.board + '_abort_refresh');
    });

    Gevent.on('boardstats_' + window.board + '_reset', function(time) {
        if(busy) return;
        reset(time);
    });

    Gevent.on('boardstats_' + window.board + '_data', function(data) {
        if(busy) return;
        Store.set('boardstats.' + window.board, {time:(+new Date), data:data});
        render_data(data);
        reset(window.threadstats.refresh+Math.round(Math.random()*10));
    });

    if(Store.get('boardstats.minimized', true)) toggle_visibility();

    var cached_stats = Store.get('boardstats.' + window.board, false);
    if(cached_stats && cached_stats.data) {
        render_data(cached_stats.data);
    }else{
        force_on_show = true;
        if(box_visible) announce_refresh();
    }

    reset();

    $('#boardstats-box').show();
});
Stage('Обработка скрытия тредов и постов',      'posthide',     Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    //if(window.thread.id) return;
    var hide_buttons = $('.postbtn-hide,.postbtn-hide-mob');
    if(!hide_buttons.length) return;

    var cleanup = function() {
        var boards = Store.get('board', {});
        var time = getTimeInDays();

        for(var board in boards) {
            if(!boards.hasOwnProperty(board)) continue;
            if(!boards[board].hasOwnProperty('hidden')) continue;
            var threads = boards[board].hidden;
            for(var num in threads) {
                if(!threads.hasOwnProperty(num)) continue;
                var added_time = threads[num];

                if($('#post-' + num).length){
                    Post(num)._storeHide(); //обновляем время, чтоб не удалить тред
                }else if(time-added_time >= window.thread.hideTimeout) {
                    Post(num)._storeUnHide();
                }
            }
        }
    };

    hide_buttons.click(function(){
        var num = $(this).data('num');
        //var thread = $('#thread-' + num);
        Post(num).hide(true);

        return false;
    });

    $('.hidden-thread-box,.hidden-p-box').live('click', function(){
        var num = $(this).data('num');
        //var thread = $('#thread-' + num);
        Post(num).unhide();
    });

    var hidden = Store.get('board.' + window.board + '.hidden', {});
    for(var num in hidden) {
        if(!hidden.hasOwnProperty(num)) continue;
        if(num == window.thread.id) continue;
        /*var el = $('#thread-' + num);
         if(el.length) Post(num).hide();*/
        var post = Post(num);
        if(post.exists() && post.isRendered()) post.hide();
    }
    cleanup();

    return false;
});
Stage('Скрытие постов по правилам',             'hiderules',    Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var rules = Store.get('other.hide_rules.list',[]);
    if(!rules.length) return;
    var tmpost = Post(1);

    var test = function(regexp, text) {
        try {
            return new RegExp(regexp, 'i').test(text);
        }catch(e){
            return false;
        }
    };

    $('.post').each(function(){
        tmpost.num = $(this).data('num');

        for(var i=0;i<rules.length;i++) {
            var title = rules[i][0];
            var tnum = rules[i][1];
            var icon = rules[i][2];
            var email = rules[i][3];
            var name = rules[i][4];
            var trip = rules[i][5];
            var subject = rules[i][6];
            var comment = rules[i][7];
            var disabled = !!rules[i][8];

            if(disabled) continue;
            if(tnum && tmpost.num != tnum) continue;
            if(icon && !test(icon, tmpost.cGetIcon())) continue;
            if(email && !test(email, tmpost.cGetEmail())) continue;
            if(name && !test(name, tmpost.cGetName())) continue;
            if(trip && !test(trip, tmpost.cGetTrip())) continue;
            if(subject && !test(subject, tmpost.cGetSubject())) continue;
            if(comment && !test(comment, tmpost.cGetComment())) continue;

            tmpost.hide(false, 'Правило #' + (i+1) + ' ' + title);
            break;
        }
    });



});
Stage('Скрытие длинных постов',                 'hidelongpost', Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    if(window.thread.id) return;
    (function($) {

        // Matches trailing non-space characters.
        var chop = /(\s*\S+|\s)$/;

        // Return a truncated html string.  Delegates to $.fn.truncate.
        $.truncate = function(html, options) {
            return $('<div></div>').append(html).truncate(options).html();
        };

        // Truncate the contents of an element in place.
        $.fn.truncate = function(options) {
            if ($.isNumeric(options)) options = {length: options};
            var o = $.extend({}, $.truncate.defaults, options);

            return this.each(function() {
                var self = $(this);

                if (o.noBreaks) self.find('br').replaceWith(' ');

                var text = self.text();
                var excess = text.length - o.length;

                if (o.stripTags) self.text(text);

                // Chop off any partial words if appropriate.
                if (o.words && excess > 0) {
                    excess = text.length - text.slice(0, o.length).replace(chop, '').length - 1;
                }

                if (excess < 0 || !excess && !o.truncated) return;

                // Iterate over each child node in reverse, removing excess text.
                $.each(self.contents().get().reverse(), function(i, el) {
                    var $el = $(el);
                    var text = $el.text();
                    var length = text.length;

                    // If the text is longer than the excess, remove the node and continue.
                    if (length <= excess) {
                        o.truncated = true;
                        excess -= length;
                        $el.remove();
                        return;
                    }

                    // Remove the excess text and append the ellipsis.
                    if (el.nodeType === 3) {
                        $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis);
                        return false;
                    }

                    // Recursively truncate child nodes.
                    $el.truncate($.extend(o, {length: length - excess}));
                    return false;
                });
            });
        };

        $.truncate.defaults = {

            // Strip all html elements, leaving only plain text.
            stripTags: false,

            // Only truncate at word boundaries.
            words: false,

            // Replace instances of <br> with a single space.
            noBreaks: false,

            // The maximum length of the truncated html.
            length: Infinity,

            // The character to use as the ellipsis.  The word joiner (U+2060) can be
            // used to prevent a hanging ellipsis, but displays incorrectly in Chrome
            // on Windows 7.
            // http://code.google.com/p/chromium/issues/detail?id=68323
            ellipsis: '\u2026' // '\u2060\u2026'

        };

    })(jQuery);
    var line_len = 150; //длина строки, после которой считается переход на новую
    var max_lines = 10; //сколько строк максимум

    var makeExpand = function(original, shrink) {
        var num = original.attr('id').substr(1);

        original.wrapInner('<div id="original-post' + num + '" style="display:none"></div>');

        var shrinked = $('<div id="shrinked-post' + num + '">' + shrink + '</div>');
        original.append(shrinked);

        var unhide = $('<span class="expand-large-comment a-link-emulator">Показать текст полностью</span>');
        shrinked.after(unhide);
        unhide.click(function(){
            unhide.remove();
            shrinked.remove();
            $('#original-post' + num).show();
        });
    };

    $('.post-message').each(function(){
        var el = $(this);
        var html = el.html();

        var lines_count = 0;
        var line_arr = html.split('<br>');
        for(var i=0;i<line_arr.length;i++) {
            var text = $('<p>' + line_arr[i] + '</p>').text();
            var lines_in_line = Math.ceil((text.length+1)/line_len); //1 символ для переноса
            if((lines_count+lines_in_line) <= max_lines) {
                lines_count += lines_in_line;
                continue;
            }

            var excess_lines = max_lines - lines_count;
            line_arr[i] = $.truncate(line_arr[i], excess_lines*line_len);
            line_arr.splice(i+1);

            makeExpand(el, line_arr.join('<br>'));
            break;
        }
    });
});
Stage('Обработка Media ссылок',                 'mediapeocess', Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var links = $('.post-message a').not('.post-reply-link');
    Media.processLinks(links);
});
Stage('Коррекция времени по часовому поясу',    'correcttz',    Stage.DOMREADY,     function(){
    if(!Store.get('other.correcttz', true)) return;
    //var local_tz_offset = -(new Date()).getTimezoneOffset()*1000;
    var server_tz_offset = window.tz_offset*60*60;

    if((-(new Date()).getTimezoneOffset()/60) == window.tz_offset) return;

    var days = ['Вск','Пнд','Втр','Срд','Чтв','Птн','Суб'];
    //var months = ['Янв','Фев','Мрт','Апр','Май','Июн','Июл','Авг','Сен','Окт','Нбр','Дек'];

    window.correctTZ = function(str) {
        str = str.replace(/(\d+)\/(\d+)\/(\d+) .+ (\d+:\d+:\d+)/g,"20$3-$2-$1T$4Z");
        str = $.trim(str);
        var timestamp = Date.parse(str);
        if(!timestamp) return str;
        timestamp = timestamp - server_tz_offset*1000;
        var date = new Date(timestamp);

        return '' +
            pad(date.getDate(), 2) +
            '/' +
            pad(date.getMonth()+1, 2) +
            '/' +
            pad(date.getFullYear()-2000, 2) +
            ' ' +
            days[date.getDay()] +
            ' ' +
            pad(date.getHours(), 2) +
            ':' +
            pad(date.getMinutes(), 2) +
            ':' +
            pad(date.getSeconds(), 2);
    };

    $('.posttime').each(function(){
        var str = $(this).text();
        $(this).text(window.correctTZ(str));
    });
});
Stage('Обработка формы ответа',                 'formprocess',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var active_id = '';
    var label_top = $('.reply-label-top');
    var label_bot = $('.reply-label-bot');
    var text_open = label_top.first().text();
    var text_close = 'Закрыть форму постинга';
    var postform = $('#postform');

    label_top.on('click', function(){
        if(active_id == 'bot') label_bot.text(text_open);

        if(active_id == 'top') {
            postform.hide();
            label_top.text(text_open);
            active_id = '';
        }else{
            $('#TopNormalReply').after(postform);
            postform.show();
            label_top.text(text_close);
            active_id = 'top';
            if(!window.thread.id) $('input[name=thread]').val(0);
        }
    });

    label_bot.on('click', function(){
        if(active_id == 'top') label_top.text(text_open);

        if(active_id == 'bot') {
            postform.hide();
            label_bot.text(text_open);
            active_id = '';
        }else{
            $('#BottomNormalReply').after(postform);
            postform.show();
            label_bot.text(text_close);
            active_id = 'bot';
            if(!window.thread.id) $('input[name=thread]').val(0);
        }
    });

    window.appendPostForm = function(num) {
        if(active_id == 'top') label_top.text(text_open);
        if(active_id == 'bot') label_bot.text(text_open);
        if(active_id == num) return;

        var post = Post(num);
        post.el().after(postform);
        postform.show();
        if(!window.thread.id) $('input[name=thread]').val(post.getThread());

        if(!$('.captcha-image:first').html()) {
            loadCaptcha();
        }
    };
});
Stage('Загрузка автообновления',                'autorefresh',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var enabled = false;
    var interval;
    var timeout;
    var remain;
    var isWindowFocused = true;
    var newPosts = [];

    window.scrollcb_array.push(function(scroll_top){
        if(!newPosts.length) return;

        var scroll = scroll_top+$(window).height();
        for(var i=0;i<newPosts.length;i++) {
            //[0] = номер поста
            //[1] = координаты по Y поста
            if(scroll >= newPosts[i][1]) {
                newPosts.splice(i, 1);
                i--;
            }
        }

        notifyNewPosts();
        if(!newPosts.length) reposRedLine();
    });
    $(window).blur(function(){
        isWindowFocused = false;

        reposRedLine();
    });
    $(window).focus(function(){
        isWindowFocused = true;

        if(newPosts.length) $(window).scroll();
        if(!$('.autorefresh-checkbox').is(':checked')) return;
        if(remain > window.config.autoUpdate.minInterval) setNewTimeout(window.config.autoUpdate.minInterval);
    });

    var reposRedLine = function() {
        var line = $('.new-posts-marker');
        if(line.length) line.removeClass('new-posts-marker');
        if(newPosts.length) $('#post-' + newPosts[0]).prev().addClass('new-posts-marker');
    };
    var current_icon;
    var setFavicon = function(icon) {
        if(icon == current_icon) return;
        if(current_icon == window.config.autoUpdate.faviconDeleted) return;
        current_icon = icon;

        $('#favicon').replaceWith(icon);
    };

    var notifyNewPosts = function() {
        var count = newPosts.length;
        if(count) {
            document.title = '(' + count + ') ' + window.config.title;
            setFavicon(window.config.autoUpdate.faviconNewposts);
        }else{
            document.title = window.config.title;
            setFavicon(window.config.autoUpdate.faviconDefault);
        }
    };
    var threadDeleted = function() {
        setFavicon(window.config.autoUpdate.faviconDeleted);
        $('.autorefresh-countdown').html(' остановлено');
    };
    var start = window.autorefresh_start = function() {
        if(enabled) return false;
        enabled = true;

        $('.autorefresh-checkbox').attr('checked','checked');

        interval = setInterval(function(){
            var autorefresh_el = $('.autorefresh-countdown');
            remain--;
            if(remain >= 0) autorefresh_el.html('через ' + remain);
            if(remain != 0) return;
            autorefresh_el.html(' выполняется...');

            updatePosts(function(data){
                if(data.error) {
                    if(data.error == 'server' && data.errorCode == -404) return threadDeleted();
                    $alert('Ошибка автообновления: ' + data.errorText);
                    calcNewTimeout(-1);
                }else{
                    if(data.updated){
                        var len = data.list.length;
                        for(var i=0;i<len;i++) {
                            var post = $('#post-' + data.list[i]);
                            newPosts.push([data.list[i], post.offset().top + post.height()]);
                        }

                        notifyNewPosts();
                        reposRedLine();
                    }
                    calcNewTimeout(data.updated);
                    if(Favorites.isFavorited(window.thread.id)) Favorites.setLastPost(data.data, window.thread.id);
                }
            });

        }, 1000);

        setNewTimeout(window.config.autoUpdate.minInterval);
    };
    var stop = function() {
        if(!enabled) return false;
        enabled = false;

        $('.autorefresh-checkbox').removeAttr('checked');

        clearInterval(interval);
        $('.autorefresh-countdown').html('');
    };
    var calcNewTimeout = function(posts) {
        if(posts>1) return setNewTimeout(window.config.autoUpdate.minInterval);
        if(isWindowFocused && posts != -1) return setNewTimeout(window.config.autoUpdate.minInterval); //иначе это ошибка

        var newTimeout = timeout + window.config.autoUpdate.stepInterval;
        if(newTimeout> window.config.autoUpdate.maxInterval) return setNewTimeout(window.config.autoUpdate.maxInterval);

        return setNewTimeout(newTimeout);
    };
    var setNewTimeout = function(newTimeout) {
        remain = newTimeout;
        timeout = newTimeout;
        $('.autorefresh-countdown').html('через ' + remain);
    };

    $('.autorefresh-checkbox').click(function(){
        var checked = $(this).is(':checked');
        if(checked) {
            start();
        }else{
            stop();
        }
        Store.set('thread.autorefresh', !!checked);
    });

    $('.autorefresh').show();
});
Stage('Клонирование форм',                      'cloneform',    Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var fields = ['e-mail', 'shampoo', 'captcha-value'];
    var maxlen = parseInt($('#settings-comment-length').val());
    var len = fields.length;

    var newlen = function(str) {
        var len = unescape(encodeURIComponent(str)).length;
        var remain = maxlen-len;
        if(remain < 0) remain = 0;
        $('.message-byte-len').html(remain);
    };

    for(var i=0;i<len;i++) {
        var field = fields[i];
        (function(field){
            $('#' + field).keyup(function(){
                var val = $('#' + field).val();
                $('#qr-' + field).val(val);
                if(field == 'shampoo') newlen(val);
            });

            $('#qr-' + field).keyup(function(){
                var val = $('#qr-' + field).val();
                $('#' + field).val(val);
                if(field == 'shampoo') newlen(val);
            });
        })(field);
    }

    $('.anoniconsselectlist').change(function(){
        var val = $(this).val();
        $('.anoniconsselectlist').val(val);
    });
});
Stage('Управление полями загрузки картинок',    'uploadfields', Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    $(".postform-image").live('change', function (){
        var field = $(this);
        var field_id = parseInt(field.attr('name').substr(5));

        var clone = $(this).clone();
        var new_id;
        if(field.attr('id').substr(0,2) == 'qr') {
            new_id = 'image' + field_id;
        }else{
            new_id = 'qr-image' + field_id;
        }
        var field_to_replace = $('#' + new_id);
        clone.attr('id', new_id);
        $(field_to_replace).replaceWith(clone);
        /*$(field_to_replace).after(clone);
         field_to_replace.remove();*/


        var show_field = $('.postform-image[name=image' + (field_id+1) + ']');
        if(show_field.length) show_field.show();
    });
});
Stage('Отслеживание фокуса форм',               'formfocus',    Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    window.activeForm = $('#shampoo');

    window.activeForm.focus(function(){
        window.activeForm = $(this);
    });

    $('#qr-shampoo').focus(function(){
        window.activeForm = $(this);
    });
});
Stage('click эвенты',                           'clickevents',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    var lastselected = '';
    var selectednum = 0;

    $('.captcha-reload-button').click(loadCaptcha);

    $('.post-message').live('mouseup',function(e){
        if (e.which != 1) return;
        var id = $(this).attr('id');
        var num = id.substr(1);
        var node;
        try {
            node = window.getSelection ? window.getSelection().focusNode.parentNode:document.selection.createRange().parentElement();
        }catch(e){
            return;
        }

        if($(node).closest('.post').data('num') != num) return;

        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        text = text + '';

        if(!text) return;
        lastselected =  text;
        selectednum = num;
        lastselected = '>' + lastselected.split("\n").join("\n>");
    });

    $('.reply-label').click(function(){
        if(!$('.captcha-image:first').html()) {
            loadCaptcha();
        }
    });

    $('#ed-toolbar').html(edToolbar('shampoo'));

    $('#qr-close').click(function(){
        $('#qr').hide();
    });

    $('.postbtn-reply-href').live('click', function() {
        var num = $(this).attr('name');
        insert('>>' + num + '\n');

        //вставляем цатату
        if(selectednum == num) {
            insert(lastselected + '\n');
            selectednum = 0;
        }

        if(Store.get('old.append_postform',false)) appendPostForm(num);
        if(window.thread.id) return false;

        var thread = Post(num).getThread();
        $('#qr-thread').val(thread);

        return false;
    });
});
Stage('Превью постов',                          'postpreview',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    //==================================================================================================
    // POST PREVIEW BY >>REFLINKS
    //скопировано из старого кода
    var pView;
    var busy = false;

    var delPostPreview = function(e) {
        pView = e.relatedTarget;
        if(!pView) return;

        while(1)
        {
            if(/^preview/.test(pView.id)) break;

            else
            {
                pView = pView.parentNode;

                if(!pView) break;
            }
        }

        setTimeout(function()
        {
            if(!pView) $each($t('div'), function(el)
            {
                if(/^preview/.test(el.id)) $del(el);
            });
            else while(pView.nextSibling) $del(pView.nextSibling);
        }, 800);
    };

    var funcPostPreview = function(htm) {
        if(!pView) return;

        pView.innerHTML = htm;
        /*$each($t('script', pView), function(el)
         {
         $del(el);
         });*/
        //eventPostPreview(pView); //а это вешало эвенты
        //var pNum = pView.id.match(/\d+/);

        /*if(!$c('ABU-refmap', pView)[0] && !postByNum[pNum] && refMap[pNum])
         showRefMap(pView, pNum);*/
    };

    var showPostPreview = function(e, pNum, tNum) {
        var link = e.target;
        var scrW = document.body.clientWidth || document.documentElement.clientWidth;
        var scrH = window.innerHeight || document.documentElement.clientHeight;
        x = $offset(link, 'offsetLeft') + link.offsetWidth/2;
        y = $offset(link, 'offsetTop');

        if(e.clientY < scrH*0.75) y += link.offsetHeight;

        pView = $new('div',
            {
                'id': 'preview-' + pNum,
                'data-num': pNum,
                'class': 'reply post',
                'html': '<span class="ABU-icn-wait">&nbsp;</span>&nbsp;Загрузка...',
                'style':
                    ('position:absolute; z-index:300; border:1px solid grey; '
                        + (x < scrW/2 ? 'left:' + x : 'right:' + parseInt(scrW - x + 2)) + 'px; '
                        + (e.clientY < scrH*0.75 ? 'top:' + y : 'bottom:' + parseInt(scrH - y - 4)) + 'px')
            },
            {
                'mouseout': delPostPreview,
                'mouseover': function()
                {
                    if(!pView) pView = this;
                }
            });

        var post = Post(pNum);
        if(!post.exists() || post.isGhost()) {
            post.download(function(res){
                if(res.errorText) return funcPostPreview('Ошибка: ' + res.errorText);
                funcPostPreview(post.previewHTML());
                if(!post.isRendered()) Media.processLinks($('#m' + pNum + ' a'));
            });
        }else{
            funcPostPreview(post.previewHTML());
        }
        $del($id(pView.id)); //удаляет старый бокс поста
        dForm.appendChild(pView);

        if(!post.isRendered()) {
            Media.processLinks($('#m' + pNum + ' a'));
        }else{
            //todo костыль. Надо что-то с этим делать.
            var preview_box = $('#preview-' + pNum);
            preview_box.find('.media-expand-button').remove();
            Media.processLinks(preview_box.find('a'));
        }
    };

    var timers = {};
    var clearTimer = function(num){
        if(timers.hasOwnProperty(num)) {
            clearTimeout(timers[num]);
            delete timers[num];
        }
    };
    var timer_ms = Store.get('other.show_post_preview_delay', 0);

    $('.post-reply-link').live('mouseover', function(e){
        var el = $(this);
        var num = el.data('num');
        var thread = el.data('thread');

        if(timer_ms) {
            timers[num] = setTimeout(function(){
                clearTimer(num);
                showPostPreview(e, num, thread);
            }, timer_ms);
        }else{
            showPostPreview(e, num, thread);
        }
    })
        .live('mouseout', function(e){
            var el = $(this);
            var num = el.data('num');
            clearTimer(num);

            delPostPreview(e);
        })
        .live('click', function(){
            var el = $(this);
            var num = el.data('num');
            Post(num).highlight();
        });
});
Stage('Опции постов',                           'postoptions',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    //опции постов

    var active = 0;
    var googleImageHref = function(image) {
        var host = window.location.host;
        var google = 'http://www.google.com/searchbyimage?image_url=';
        return google + 'http://' + host + image.attr('href');
    };

    var fillMenu = function(menu, num) {
        var post = Post(num);
        var images =  $('#post-body-' + num + ' .image .desktop');
        /////////////////////////////////////////////////////////
        var replyRow = $('<a href="#">Ответить</a>');
        replyRow.click(function(){
            $(document.getElementsByName(num)).click();
            return false;
        });
        menu.append(replyRow);
        /////////////////////////////////////////////////////////
        var hideRow = $('<a href="#">Скрыть</a>');
        hideRow.click(function(){
            Post(num).hide(true);
            hideMenu();
            return false;
        });
        menu.append(hideRow);
        /////////////////////////////////////////////////////////
        if(window.thread.id){
            var reportRow = $('<a href="#">Пожаловаться</a>');
            reportRow.click(function(){
                var field = $('#report-form-comment');
                field.val( '>>' + num + ' ' + field.val() );
                hideMenu();
                field.focus();

                return false;
            });
            menu.append(reportRow);
        }
        /////////////////////////////////////////////////////////
        if(images.length == 1) {
            menu.append('<a href="' + googleImageHref(images) + '" target="_blank">Найти картинку</a>');
        }else if(images.length > 1) {
            images.each(function(k){
                var v = $(this);
                menu.append('<a href="' + googleImageHref(v) + '" target="_blank">Найти картинку ' + (k+1) + '</a>');
            });
        }
        /////////////////////////////////////////////////////////
        if(post.isThread()){
            var label = 'В избранное';
            var is_favorited = Favorites.isFavorited(num);
            if(is_favorited) label = 'Из избранного';
            var favRow = $('<a href="#">' + label + '</a>');
            favRow.click(function(){
                if(!is_favorited) {
                    Favorites.add(num);
                    Favorites.show();
                    Favorites._send_fav(num);
                }else{
                    Favorites.remove(num);
                }
                hideMenu();

                return false;
            });
            menu.append(favRow);
        }
    };

    var genPos = function(el) {
        var ret = {};
        var pos = el.offset();

        ret.left = (pos.left + el.outerWidth()) + 'px';
        ret.top = pos.top + 'px';

        return ret;
    };

    var hideMenu = function() {
        if(!active) return;
        active = 0;
        $('#ABU-select').remove();
    };

    $('body').click(hideMenu);

    $('.postbtn-options').live('click',function(){
        var el = $(this);
        var num = el.data('num');
        var old = active;
        hideMenu();
        active = num;

        if(old == num) {
            active = 0;
            return false;
        }

        var menu = $('<span></span>');
        menu.attr('id', 'ABU-select');
        menu.attr('class', 'reply');
        menu.css(genPos(el));
        fillMenu(menu, num);
        menu.click(hideMenu);

        $('body').append(menu);
    });
});
Stage('Система раскрытия на полный экран',      'screenexpand', Stage.DOMREADY,     function(){
    var container = $('<div style="position: fixed;display: none;background-color: #555555;padding:8px" id="fullscreen-container"></div>');
    var win = $( window );
    var active = false;
    var mouse_on_container = false;
    var img_width, img_height;
    var multiplier = 1;
    var container_mouse_pos_x = 0;
    var container_mouse_pos_y = 0;
    var webm = false;

    $('body').append(container);

    window.fullscreenExpand = function(num, src, thumb_src, image_width, image_height) {
        if(active == num) {
            hide();
            return false;
        }

        var win_width = win.width();
        var win_height = win.height();

        img_width = image_width;
        img_height = image_height;
        multiplier = 1;
        active = num;
        webm = src.substr(-5) == '.webm';
        mouse_on_container = false;

        container
            .html(webm?'<video name="media" loop="1" muted="1" controls="" autoplay="" height="100%" width="100%"><source class="video" height="100%" width="100%" type="video/webm" src="' + src + '"></source></video>':'<img src="' + src + '" width="100%" height="100%" />')
            .css('top', ((win_height-image_height)/2) + 'px')
            .css('left', ((win_width-image_width)/2) + 'px')
            .width(image_width)
            .height(image_height)
            .show();

        if(image_width > win_width || image_height > win_height) {
            var multiplier_width = Math.floor(win_width/image_width*10)/10;
            var multiplier_height = Math.floor(win_height/image_height*10)/10;
            if(multiplier_width < 0.1) multiplier_width = 0.1;
            if(multiplier_height < 0.1) multiplier_height = 0.1;

            resize(multiplier_width<multiplier_height ? multiplier_width : multiplier_height, true);
        }

        return false;
    };

    var hide = function() {
        active = false;
        mouse_on_container = false;
        container.hide();
        if(webm) container.html('');
    };

    var resize = function(new_multiplier, center) {
        if(new_multiplier < 0.1) return;
        if(new_multiplier > 5) return;

        repos(new_multiplier, center);

        multiplier = new_multiplier;

        container
            .width(img_width * multiplier)
            .height(img_height * multiplier);
    };

    var repos = function(new_multiplier, center) {
        var scroll_top = win.scrollTop();
        var scroll_left = win.scrollLeft();
        var container_offset = container.offset();
        var x_on_container;
        var y_on_container;
        if(center) {
            x_on_container = img_width/2;
            y_on_container = img_height/2;
        }else{
            x_on_container = (container_mouse_pos_x-container_offset.left+scroll_left);
            y_on_container = (container_mouse_pos_y-container_offset.top+scroll_top);
        }
        var container_top = container_offset.top-scroll_top;
        var container_left = container_offset.left-scroll_left;
        var delta_multiplier = new_multiplier-multiplier;
        var delta_top = delta_multiplier*y_on_container/multiplier;
        var delta_left = delta_multiplier*x_on_container/multiplier;

        container
            .css('left', (container_left-delta_left) + 'px')
            .css('top', (container_top-delta_top) + 'px');
    };

    container.mouseover(function(){
        mouse_on_container = true;
    });

    container.mouseout(function(){
        mouse_on_container = false;
    });

    container.mousemove(function(e){
        container_mouse_pos_x = e.clientX;
        container_mouse_pos_y = e.clientY;
    });

    win.keyup(function(e){
        if(!active) return;
        var move;
        var code = e.keyCode || e.which;

        if(code == 37 || code == 65 || code == 97 || code == 1092) {
            move = -1;
        }else if(code == 39 || code == 68 || code == 100 || code == 1074) {
            move = 1;
        }else if(code == 27) {
            return hide();
        }else{
            return;
        }

        var images = $('.image-link');
        var active_index = images.index($('#exlink-' + active));
        var new_index = active_index + move;
        if(new_index < 0) new_index = images.length-1;
        if(new_index > images.length-1) new_index = 0;
        var next = images.eq(new_index);

        next.find('a').click();
    });

    win.click(function(e){
        if(!active) return;
        if(e.which != 1) return;
        if($(e.target).closest('.img').length) return;
        if($(e.target).attr('name') == 'expandfunc') return;
        if($(e.target).closest('#fullscreen-container').length) return;
        hide();
    });

    win.bind((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel", function(e){
        if(!active) return;
        if(!mouse_on_container) return;
        e.preventDefault();
        var evt = window.event || e; //equalize event object
        evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
        var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by Opera and FF

        if(delta > 0) {
            //container.width(container.width()*1.1 + 'px');
            //container.height(container.height()*1.1 + 'px');
            resize(multiplier+0.1);
        }
        else{
            //container.width(container.width()*0.9 + 'px');
            //container.height(container.height()*0.9 + 'px');
            resize(multiplier-0.1);
        }
    });

    draggable(container, {click: function(){
        hide();
    },
    mousedown: function(e_x,e_y){
        if(!webm) return;
        var container_top = parseInt(container.css('top'));
        var container_height = container.height();

        if((container_top+container_height) - e_y < 35) return false;
    }});
});
Stage('renderStore',                            'renderstore',  Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    renderStore();

    if(Store.get('styling.disable_bytelen_counter',false)) $('.message-byte-len').hide();
    if(Store.get('styling.portform_format_panel',false)) {
        $('.toolbar-area').css('display','table-row');
        $('#CommentToolbar').html(edToolbar('shampoo'));
        $('#qr-CommentToolbar').html(edToolbar('qr-shampoo'));
    }
});
Stage('Кнопки перемотки страницы',              'scrollbtns',   Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
    if(!Store.get('other.scroll_btns',false)) return;

    var border = 300;
    var up_bnt = $('#up-nav-arrow');
    var down_bnt = $('#down-nav-arrow');
    var up_visible = false;
    var down_visible = false;

    var up_show = function(){
        if(up_visible) return;
        up_visible = true;
        up_bnt.css('opacity',1);
    };
    var up_hide = function(){
        if(!up_visible) return;
        up_visible = false;
        up_bnt.css('opacity',0);
    };
    var down_show = function(){
        if(down_visible) return;
        down_visible = true;
        down_bnt.css('opacity',1);
    };
    var down_hide = function(){
        if(!down_visible) return;
        down_visible = false;
        down_bnt.css('opacity',0);
    };


    window.scrollcb_array.push(function(scroll_top){
        if(scroll_top > border){
            up_show();
        }else{
            up_hide();
            down_show();
            return;
        }
        var max_scroll = $(document).height()-$(window).height();
        var delta = max_scroll - scroll_top;

        if(delta > border){
            down_show();
        }else{
            down_hide();
            up_show();
        }
    });

    up_bnt.click(function(){
        $(window).scrollTop(0).scroll();
    });

    down_bnt.click(function(){
        $(window).scrollTop($(document).height()).scroll();
    });
});
Stage('Избранное',                              'favorites',    Stage.DOMREADY,     function(){
    var fav_body = $('#qr-fav-body');
    var favorites = Store.get("favorites");

    for(var key in favorites) {
        if(!favorites.hasOwnProperty(key)) continue;
        var thread = favorites[key];
        if(typeof(thread) != 'object' || !thread.hasOwnProperty('last_post')) continue;
        var thread_row = Favorites.render_get_html(key, thread);

        fav_body.append(thread_row);
    }

    $('#qr-fav-close').click(function(){
        Favorites.hide();
    });

    $('#fav-menu-btn').click(function(){
        if(Favorites.visible) {
            Favorites.hide();
        }else{
            Favorites.show();
        }
    });

    Favorites.init();

    $('.fav-row-remove').live('click', function(){
        var num = $(this).data('num');
        if(confirm('Вы уверены?')) Favorites.remove(num);
    });

    $('.fav-row-update').live('click', function(){
        var num = $(this).data('num');
        Favorites.forceRefresh(num);
    });

    if(Store.get('styling.qr-fav.visible',false)) Favorites.render_show();

    $('.postbtn-favorite').click(function(){
        var num = $(this).data('num');
        var favorited = Favorites.isFavorited(num);

        if(favorited) {
            Favorites.remove(num);
        }else{
            Favorites.add(num);
            Favorites.render_show();
            Favorites._send_fav(num);
        }
    });

    if(Store.get('other.fav_stats', false)) $('.loice-bar').css('display','inline-block');
});
Stage('Загрузка плавающих окон',                'qrload',       Stage.DOMREADY,     function(){
    draggable_qr('qr', 'left');
    draggable_qr('qr-fav', 'center');
    draggable_qr('settings-window', 'center');
    draggable_qr('setting-editor-window', 'center');
});
Stage('Юзеропции',                              'settings',     Stage.DOMREADY,     function(){
    Settings.addCategory('favorites', 'Избранное');
    Settings.addCategory('old', 'Раньшебылолучше');
    Settings.addCategory('other', 'Другое');
    Settings.addCategory('mobile', 'Мобильная версия');
    Settings.addCategory('hide', 'Скрытие');

    Settings.addSetting('favorites',    'favorites.show_on_new', {
        label: 'Показывать избранное при новом сообщении',
        default: true
    });
    Settings.addSetting('favorites',    'favorites.deleted_behavior', {
        label: 'При удалении треда на сервере',
        multi: true,
        values: [
            ['0', 'Не удалять из избранного'],
            ['1', 'Повторно проверять перед удалением'],
            ['2', 'Удалять из избранного сразу']
        ],
        default: 1
    });
    Settings.addSetting('old',          'styling.qr.disable_if_postform', {
        label: 'Не выводить плавающую форму если развёрнута другая форма',
        default: false
    });
    Settings.addSetting('old',          'styling.qr.disable', {
        label: 'Не выводить плавающую форму при клике на номер поста',
        default: false
    });
    Settings.addSetting('old',          'styling.disable_bytelen_counter', {
        label: 'Не показывать счётчик байт в форме постинга',
        default: false
    });
    Settings.addSetting('old',        'styling.portform_format_panel', {
        label: 'Показ панели разметки текста в форме',
        default: false
    });
    Settings.addSetting('old',        'old.append_postform', {
        label: 'Показ формы постинга под постом при ответе',
        default: false
    });
    Settings.addSetting('old',        'old.ctrl_enter_submit', {
        label: 'Отправка поста по Ctrl+Enter',
        default: true
    });
    Settings.addSetting('old',        'old.media_thumbnails', {
        label: 'Показ превью видео',
        default: true
    });
    Settings.addSetting('old',  'old.media_thumbnails_on_hover', {
        label: 'Показ превью видео только при наводе мыши на ссылку',
        default: true
    });
    Settings.addSetting('old',          'other.fullscreen_expand', {
        label: 'Разворачивать картинки в центре экрана',
        default: true
    });

    Settings.addSetting('other',        'other.on_reply_from_main', {
        label: 'При ответе с главной в тред',
        multi: true,
        values: [
            ['0', 'Ничего не делать'],
            ['1', 'Перенаправлять в тред'],
            ['2', 'Разворачивать тред']
        ],
        default: 1
    });
    Settings.addSetting('other',        'other.qr_close_on_send', {
        label: 'Закрывать плавающую форму после ответа',
        default: true
    });
    Settings.addSetting('other',        'other.custom_css.enabled', {
        label: 'Пользовательский CSS',
        default: false,
        edit: {
            label: 'Редактировать',
            title: 'Редактировать СSS',
            editor: 'textarea',
            path: 'other.custom_css.data',
            //importable: true, //если true, то выводить кнопки импорта и экспорта
            saveable: true,
            default: ''
        }
    });
    Settings.addSetting('other',        'other.show_post_preview_delay', {
        label: 'Задержка показа ответа при наводе мыши на номер поста',
        multi: true,
        values: [
            ['0', 'Нет'],
            ['50', '50мс'],
            ['100', '100мс'],
            ['200', '200мс'],
            ['300', '300мс'],
            ['400', '400мс'],
            ['500', '500мс']
        ],
        default: 0
    });
    Settings.addSetting('other',        'other.expand_autoscroll', {
        label: 'При сворачивании длинной пикчи фокусироваться на пост',
        default: true
    });
    Settings.addSetting('other',        'other.scroll_btns', {
        label: 'Показ кнопок перемотки страницы',
        default: false
    });
    Settings.addSetting('other',          'other.qr_hotkey', {
        label: 'Выводить плавающую форму по Ctrl+Space',
        default: true
    });
    Settings.addSetting('other',          'other.boardstats', {
        label: 'Показывать топ тредов',
        default: true
    });
    Settings.addSetting('other',          'other.fav_stats', {
        label: 'Показывать количество подписок на треды',
        default: false
    });
    Settings.addSetting('other',          'other.myboards.enabled', {
        label: 'Показывать Мои доски',
        default: true
    });
    Settings.addSetting('other',          'other.myboards.menu', {
        label: 'Заменить меню разделов на Мои доски',
        default: false
    });
    Settings.addSetting('other',          'other.correcttz', {
        label: 'Коррекция часового пояса',
        default: true
    });

    Settings.addSetting('mobile',       'mobile.dont_expand_images', {
        label: 'Открывать пикчи в новом окне',
        default: true
    });
    Settings.addSetting('mobile',       'mobile.hide_qr', {
        label: 'Отключить плавающую форму',
        default: true
    });

    Settings.addSetting('hide',        'other.hide_rules.enabled', {
        label: 'Правила скрытия постов',
        default: false,
        edit: {
            label: 'Редактировать',
            title: 'Редактировать правила скрытия',
            editor: 'hiderules',
            path: 'other.hide_rules.list',
            importable: true,
            default: []
        }
    });

    if(Store.get('debug')) {
        Settings.addCategory('debugdtages', '[debug] отключение стадий');

        var stages = [
            ['Загрузка Media провайдеров','media'],
            ['Загрузка стиля','styleload'],
            ['Переключение разделов на мобилках','boardswitch'],
            ['Переключение стилей','styleswitch'],
            ['Статистика тредов','threadstats'],
            ['Обработка нажатий клавиш', 'keypress'],
            ['Обработка скрытия тредов и постов','posthide'],
            ['Скрытие постов по правилам', 'hiderules'],
            ['Скрытие длинных ОП-постов','hidelongpost'],
            ['Обработка и отправка постов на сервер','postsumbit'],
            ['Enable debug','enabledebug'],
            ['NSFW','nsfw'],
            ['Коррекция времени по часовому поясу','correcttz'],
            ['Обработка Media ссылок','mediapeocess'],
            ['DEBUG Обратная совместимость ответов','wakabareply'],
            ['Наполнение карты постов','mapfill'],
            ['Обработка формы ответа','formprocess'],
            ['Загрузка автообновления','autorefresh'],
            ['Клонирование форм','cloneform'],
            ['Управление полями загрузки картинок','uploadfields'],
            ['Отслеживание фокуса форм','formfocus'],
            ['click эвенты','clickevents'],
            ['Превью постов','postpreview'],
            ['Опции постов','postoptions'],
            ['renderStore','renderstore'],
            ['Кнопки перемотки страницы','scrollbtns'],
            ['Избранное','favorites'],
            ['Загрузка плавающих окон','qrload'],
            ['Мои доски','myboards'],
            ['Подсветка якоря','ancorlight']
        ];
        for(var i=0;i<stages.length;i++) {
            var name = stages[i][0];
            var id = stages[i][1];

            Settings.addSetting('debugdtages', 'debug_disable_stage.' + id, {
                label: 'Отключить [' + name + ']',
                default: false
            });
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////
    Settings.addEditor('textarea', function(val){
        var body = $('#setting-editor-body');
        var textarea = $('<textarea id="setting-editor-textarea-textarea"></textarea>');
        textarea.val(val);
        body.append(textarea);
    }, function(){
        //save
        return $('#setting-editor-textarea-textarea').val();
    });
    /////////////////////////////////////////////////////////////////////////////////////
    Settings.addEditor('singleinput', function(val){
        var body = $('#setting-editor-body');
        var input = $('<span id="setting-editor-singleinput-text">Укажите список разделов через запятую.<br>Приммер: b,fag,po<br></span><input type="text" id="setting-editor-singleinput-input" />');
        input.val(val);
        body.append(input);
    }, function(){
        //save
        return $('#setting-editor-singleinput-input').val();
    });
    /////////////////////////////////////////////////////////////////////////////////////
    var rules = [];
    Settings.addEditor('hiderules', function(val){
        var that = this;
        var last_rule = 0;
        var append_row = function(title,tnum,icon,email,name,trip,subject,comment,disabled) {
            var empty_cell = '<span class="hiderules-table-empty-cell">.*</span>';

            table.append('<tr id="hiderules-table-row' + i + '" class="' + (disabled?'hiderules-table-row-disabled':'') + '">' +
                '<td>№' + last_rule + '</td>' +
                '<td>' + (escapeHTML(title) || '') + '</td>' +
                '<td>' + (escapeHTML(tnum) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(icon) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(email) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(name) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(trip) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(subject) || empty_cell) + '</td>' +
                '<td>' + (escapeHTML(comment) || empty_cell) + '</td>' +
                '<td>' +
                '<input type="button" value="Экспорт" class="hiderules-table-row-export-btn" data-num="' + i + '">' +
                '<input type="button" value="Удалить" class="hiderules-table-row-delete-btn" data-num="' + i + '">' +
                '</td>' +
                '</tr>');
        };

        var body = $('#setting-editor-body');
        var table = $('<table id="hiderules-table" class="hiderules-table">' +
            '<thead>' +
            '<tr id="hiderules-table-header">' +
            '<td>№</td>' +
            '<td>Название</td>' +
            '<td>#треда</td>' +
            '<td>Иконка</td>' +
            '<td>Email</td>' +
            '<td>Имя/ID</td>' +
            '<td>Трипкод</td>' +
            '<td>Тема</td>' +
            '<td>Сообщение</td>' +
            '<td>Управление</td>' +
            '</tr>' +
            '</thead>' +
            '</table>');
        rules = val;
        body.html('');

        for(var i=0;i<rules.length;i++) {
            last_rule = i+1;
            var title = rules[i][0];
            var tnum = rules[i][1];
            var icon = rules[i][2];
            var email = rules[i][3];
            var name = rules[i][4];
            var trip = rules[i][5];
            var subject = rules[i][6];
            var comment = rules[i][7];
            var disabled = !!rules[i][8];

            append_row.apply(this, rules[i]);
        }

        table.append(
            '<tr id="hiderules-add-form">' +
            '<td class="hiderules-add-row">№' + (i+1) + '</td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-title"    class="hiderules-add-input error"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-tnum"     class="hiderules-add-input"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-icon"     class="hiderules-add-input" placeholder=".*"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-email"    class="hiderules-add-input" placeholder=".*"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-name"     class="hiderules-add-input" placeholder=".*"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-trip"     class="hiderules-add-input" placeholder=".*"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-subject"  class="hiderules-add-input" placeholder=".*"></td>' +
            '<td class="hiderules-add-row"><input type="text" id="hiderules-add-input-comment"  class="hiderules-add-input" placeholder=".*"></td>' +
            '<td><input id="hiderules-add-submit-btn" type="button" value="Добавить" disabled="disabled"></td>' +
            '</tr>');

        var add_form = $(
            '<div id="hiderules-add-form">' +
            '<div class="hiderules-add-row"><span class="hiderules-add-label">Правило:</span>  <input type="text" id="hiderules-add-json-input" placeholder="Можно вставить сохранённое ранее"></div>' +
            'В полях указываются регулярные выражения.<br>' +
            'Для конвертации строк в регулярки используйте конвертер:<br>' +
            '<input type="text" id="hiderules-add-converter-str"> -> <input type="text" id="hiderules-add-converter-regex" readonly="readonly"><br>' +
            '</div>');

        body.append(table);
        body.append(add_form);
        body.append('<div id="hiderules-bottom">Нижние кнопки импорта и экспорта импортируют/экспортируют ВСЕ правила</div>');
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        $('.hiderules-table-row-export-btn').click(function(){
            var num = $(this).data('num');
            var rule =  Store.get('other.hide_rules.list.' + num);
            prompt('Скопируйте', JSON.stringify(rule));
        });
        $('.hiderules-table-row-delete-btn').click(function(){
            var num = $(this).data('num');
            var rules =  Store.get('other.hide_rules.list');
            rules.splice(num,1);
            Store.set('other.hide_rules.list', rules);
            Settings._editor_show(rules);
        });
        $('#hiderules-add-converter-str').keyup(function(){
            var val = $(this).val();
            var json = String(val).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&');
            $('#hiderules-add-converter-regex').val(json);
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        var check_errors = function() {
            var err = false;
            for(var i=0;i<el.length;i++) {
                var el_name = el[i][0];
                var el_el = el[i][1];
                if(el_name == 'title') if(!el_el.val()) {
                    err = true;
                    el_el.addClass('error');
                    continue;
                }else{
                    el_el.removeClass('error');
                    continue;
                }

                try{
                    new RegExp(el_el.val());
                    el_el.removeClass('error');
                }catch(e){
                    el_el.addClass('error');
                }
            }

            return err;
        };

        var el = [];
        el.push(['title', $('#hiderules-add-input-title')]);
        el.push(['tnum', $('#hiderules-add-input-tnum')]);
        el.push(['icon', $('#hiderules-add-input-icon')]);
        el.push(['email', $('#hiderules-add-input-email')]);
        el.push(['name', $('#hiderules-add-input-name')]);
        el.push(['trip', $('#hiderules-add-input-trip')]);
        el.push(['subject', $('#hiderules-add-input-subject')]);
        el.push(['comment', $('#hiderules-add-input-comment')]);

        var submit_btn = $('#hiderules-add-submit-btn');
        var json_input = $('#hiderules-add-json-input');

        $('.hiderules-add-input').keyup(function(){
            var arr = [];
            for(var i=0;i<el.length;i++) arr.push(el[i][1].val());
            json_input.val( JSON.stringify(arr) );

            if(check_errors()) {
                submit_btn.attr('disabled','disabled');
            }else{
                submit_btn.removeAttr('disabled','disabled');
            }

            json_input.removeClass('error');
        })
            .focus(function(){
                $(this).attr('size', '25');
            })
            .blur(function(){
                $(this).removeAttr('size');
            });
        $(json_input).keyup(function(){
            var arr;
            try {
                arr = JSON.parse(json_input.val());
            }catch(e){
                json_input.addClass('error');
                return;
            }
            if(!arr.length || (arr.length != 8 && arr.length != 9)) {
                json_input.addClass('error');
                return;
            }
            for(var i=0;i<8;i++) {
                el[i][1].val( arr[i] );
            }
            json_input.removeClass('error');
            check_errors();
        });

        $(submit_btn).click(function(){
            var arr = [];
            for(var i=0;i<el.length;i++) arr.push(el[i][1].val());
            var c_arr = Store.get('other.hide_rules.list',[]);
            c_arr.push(arr);
            Store.set('other.hide_rules.list', c_arr);
            last_rule++;
            //append_row.apply(that,arr);
            Settings._editor_show(c_arr);
        });
    }, function(){
        //save
        //return $('#setting-editor-textarea-textarea').val();
    });
    /////////////////////////////////////////////////////////////////////////////////////

    $('#settings').click(function(){
        Settings.toggle();
    });
    $('#settings-btn-close').click(function(){
        Settings.hide();
    });
    $('#settings-btn-export').click(function(){
        prompt('Скопируйте и сохраните', Store.export());
    });
    $('#settings-btn-import').click(function(){
        var json = prompt('Вставьте сохранённые настройки');
        if(!json) return;

        try {
            JSON.parse(json);
        }catch(e){
            return $alert('Неверный формат');
        }

        localStorage.store = json;

        Store.reload();
        Settings.hide();
        $alert('Для применения настроек обновите страницу');
    });
    $('#settings-btn-save').click(function(){
        var changed = [];

        $('.settings-setting-checkbox').each(function(){
            var box = $(this);
            var category = box.data('category');
            var path = box.data('path');
            var setting = Settings.getSetting(category, path);
            var current_value = Store.get(path, setting.default);
            var new_value = box.is(':checked');
            if(current_value == new_value) return;

            changed.push(path);
            if(new_value == setting.default) {
                Store.del(path);
            }else{
                Store.set(path, new_value);
            }
        });

        $('.settings-setting-multibox').each(function(){
            var box = $(this);
            var category = box.data('category');
            var path = box.data('path');
            var setting = Settings.getSetting(category, path);
            var current_value = Store.get(path, setting.default);
            var new_value = box.val();
            if(current_value == new_value) return;

            changed.push(path);
            if(new_value == setting.default) {
                Store.del(path);
            }else{
                Store.set(path, new_value);
            }
        });

        if(changed.length) $alert('Для применения настроек обновите страницу');
        Settings.hide();
    });

    $('#setting-editor-btn-save').click(function(){
        var newval = Settings._editor_onsave();
        //var currentval = Store.get(Settings._editor_path, Settings._editor_default_val);
        if(newval == Settings._editor_default_val) {
            Store.del(Settings._editor_path);
        }else{
            Store.set(Settings._editor_path, newval);
        }
        $('#setting-editor-window').hide();
    });

    $('#setting-editor-btn-close').click(function(){
        $('#setting-editor-window').hide();
    });

    $('#setting-editor-btn-export').click(function(){
        prompt('Скопируйте и сохраните', JSON.stringify(Store.get(Settings._editor_path, {})));
    });

    $('#setting-editor-btn-import').click(function(){
        var json = prompt('Вставьте сохранённое');
        var obj;
        if(!json) return;

        try {
            obj = JSON.parse(json);
        }catch(e){
            return $alert('Неверный формат');
        }

        Store.set(Settings._editor_path, obj);
        $('#setting-editor-window').hide();
    });
});
Stage('Подсветка якоря',                        'ancorlight',   Stage.DOMREADY,     function(){
    if(!window.thread.board) return; //не запускаем на главной
     var match;

     if(match=/#([0-9]+)/.exec(document.location.toString())) {
         var post = Post(match[1]);
         if(!post.exists() || !post.isRendered()) return;
         Post(match[1]).highlight();
         scrollToPost(match[1]);
         history.pushState('', document.title, window.location.pathname);
     }

});
Stage('Предупреждение о анальной цензуре',      'censure',      Stage.DOMREADY,     function(){
    var checks = 0;
    var interval = setInterval(function(){
        if($('#de-panel').length && !$('.jcaptcha').length && (+new Date)-Store.get('tmp.censure',0) > 1000*60*60*3) {
            $alert('У вас установлен куклоскрипт, который без вашего ведома может удалять треды из выдачи и ' +
                'премодерировать информацию. Рекомендуем избавиться от него.' +
                '<a href="https://twitter.com/abunyasha/status/520708815038451712" target="_blank">Подробнее</a><br>' +
                '<a href="#" id="censure-notice-close">Закрыть</a>', 'wait');

            $('#censure-notice-close').click(function(event) {
                event.preventDefault();
                $close($id('ABU-alert-wait'));
                Store.set('tmp.censure',(+new Date));
            });

            clearInterval(interval);
        }
        checks++;
        if(checks >= 10) clearInterval(interval);
    },1000);
});

function updatePosts(callback) { //todo временная заплатка
    Post(window.thread.id).download(function( data ) {
        if(data.hasOwnProperty('error')) return callback && callback(data);
        if(!data.list.length) return callback && callback({updated:0, list:[], data: [], favorites:data.favorites});
        var tmpost = Post(1);

        $.each( data.list, function( key, val ) {
            tmpost.num = val;

            appendPost(tmpost.getJSON());
            tmpost.raw().rendered = true;
        });

        if(Store.get('other.fav_stats',false) && data.favorites) {
            $('#loice-bar' + window.thread.id)
                .html(data.favorites)
                .removeClass('loice-bar-empty')
                .show();
        }

        if(callback) callback(data);
    });
}
function generatePostBody(post) {
    post.comment = post.comment.replace('<script ', '<!--<textarea '); //какой-то УМНИК решил, что будет гениальной идеей в посты вставлять кривой <script> с document.write
    post.comment = post.comment.replace('</script>', '</textarea>-->');

    var postshtml = '';
    var replyhtml = Post(post.num).getReplyLinks();

    postshtml += '<div id="post-details-' + post.num + '" class="post-details">';
    postshtml += '<input type="checkbox" name="delete"  class="turnmeoff" value="' + post.num + '" /> ';
    if(post.subject) {
        postshtml += '<span class="post-title">';
        postshtml +=  post.subject;
        postshtml += '</span> ';
    }
    if(post.email) {
        postshtml += '<a href="' + post.email + '" class="post-email">' + post.name + '</a> ';
    }else{
        postshtml += '<span class="ananimas">' + post.name + '</span> ';
    }
    if(post.icon) {
        postshtml += '<span class="post-icon">' + post.icon + '</span>';
    }
    switch (post.trip) {
        case '!!%adm%!!':        postshtml += '<span class="adm">## Abu ##<\/span>'; break;
        case '!!%mod%!!':        postshtml += '<span class="mod">## Mod ##<\/span>'; break;
        case '!!%Inquisitor%!!': postshtml += '<span class="inquisitor">## Applejack ##<\/span>'; break;
        case '!!%coder%!!':      postshtml += '<span class="mod">## Кодер ##<\/span>'; break;
        default:                 postshtml += '<span class="postertrip">' + post.trip + '<\/span>';
    }
    if(post.op == 1) {
        postshtml += '		<span class="ophui"># OP</span>&nbsp;';
    }
    postshtml += '	<span class="posttime">' + (window.correctTZ?window.correctTZ(post.date):post.date) + '&nbsp;</span>';
    postshtml += '	<span class="reflink">';
    postshtml += '<a href="/' + window.thread.board + '/res/' + post.parent + '.html#' + post.num + '">№</a>';
    postshtml += '<a href="/' + window.thread.board + '/res/' + post.parent + '.html#' + post.num + '" class="postbtn-reply-href" name="' + post.num + '">' + post.num + '</a>';
    postshtml += '		<span class="postpanel">';
    postshtml += '          <span data-num="' + post.num + '" class="postbtn-options" title="Опции поста"></span>';
    //postshtml += '			<a href="#' + post.num + '" onclick="insert(\'>>' + post.num + '\');return false" data-url="' + post.num + '" class="postbtn-rep btn-reply" title="Ответить"></a>';
    postshtml += '			<a class="postbtn-adm" style="display:none" href="#" onclick="addAdminMenu(this); return false;" onmouseout="removeAdminMenu(event); return false;"></a>';
    postshtml += '		</span>';
    postshtml += '	</span>';
    postshtml += '	<br class="turnmeoff" />';
    postshtml += '</div>';
    postshtml += '<div class="images ' + ((post.files && post.files.length==1)?'images-single':'') + '">';

    if(post.files) {
        var len = post.files.length;
        for(var i=0;i<len;i++) {
            var file = post.files[i];
            var is_webm = file.name.substr(-5) == '.webm';
            postshtml += '			<figure class="image">';
            postshtml += '				<figcaption class="file-attr">';
            postshtml += '					<a class="desktop" target="_blank" href="/' + window.thread.board + '/' + file.path + '">' + file.name + '</a>';
            if(is_webm) postshtml += '      <img src="/makaba/templates/img/webm-logo.png" width="50px" alt="webm file" id="webm-icon-' + post.num + '-' + file.md5 + '"> ';
            postshtml += '					<span class="filesize">(' + file.size + 'Кб, ' + file.width + 'x' + file.height + ')</span>';
            postshtml += '				</figcaption>';
            postshtml += '				';
            postshtml += '				<div id="exlink-' + post.num + '-' + file.md5 + '">';
            postshtml += '					<a href="/' + window.thread.board + '/' + file.path + '" name="expandfunc" onclick="expand(\'' + post.num + '-' + file.md5 + '\',\'/' + window.thread.board + '/' + file.path + '\',\'/' + window.thread.board + '/' + file.thumbnail + '\',' + file.width + ',' + file.height + ',' + file.tn_width + ',' + file.tn_height + '); return false;">';
            postshtml += '						<img src="/' + window.thread.board + '/' + file.thumbnail + '" width="' + file.tn_width + '" height="' + file.tn_height + '" alt="' + file.size + '" class="img preview' + (is_webm?' webm-file':'') + '" />';
            postshtml += '					</a>';
            postshtml += '				</div>';
            postshtml += '			</figure>';
        }
    } else if(post.video) {
        postshtml += '		<div style="float: left; margin: 5px; margin-right:10px">';
        postshtml += '			' + post.video;
        postshtml += '		</div>';
    }
    postshtml += '</div>';
    postshtml += '<blockquote id="m' + post.num + '" class="post-message">';
    postshtml += post.comment;
    if(post.banned == 1) postshtml += '			<br/><span class="pomyanem">(Автор этого поста был забанен. Помянем.)</span>';
    else if(post.banned == 2) postshtml += '	<br/><span class="pomyanem">(Автор этого поста был предупрежден.)</span>';
    postshtml += '</blockquote>';
    postshtml += '<div id="refmap-' + post.num + '" class="ABU-refmap" style="' + (replyhtml?'':'display: none;') + '"><em>Ответы: </em>' + replyhtml + '</div>';

    return postshtml;
}
function appendPost(post) {
    //todo перенести в ООП
    if(!post.hasOwnProperty('num')) return false; //это какой-то неправильный пост
    if($('#post-' + post.num).length) return false;
    var postshtml = '';

    postshtml += '<div id="post-' + post.num + '" class="post-wrapper">';
    postshtml += '<div class="reply post" id="post-body-' + post.num + '" data-num="' + post.num + '">';
    postshtml += generatePostBody(post);
    postshtml += '</div>';
    postshtml += '</div>';

    $('.thread').append(postshtml);

    Media.processLinks($('#post-' + post.num + ' a'));

    return true;
}
function updateThread() {
    //функция обновления треда, которая вызывается по кнопке "обновить тред"
    $alert('Загрузка...', 'wait');

    updatePosts(function(data) {
        $close($id('ABU-alert-wait'));

        if(data.updated) $alert('Новых постов: ' + data.updated);
        else if(data.error) $alert('Ошибка: ' + data.errorText);
        else $alert('Нет новых постов');

        if(Favorites.isFavorited(window.thread.id)) Favorites.setLastPost(data.data, window.thread.id);
    });
}
function requestCaptchaKey(callback) {
    //функция загрузки ключа капчи с сервера
    //если в параметре коллбека нет {key: ... } значит возвращён текст ошибки

    var userCode = get_cookie('usercode');
    var url = '/makaba/captcha.fcgi';
    if(userCode) url += '?usercode=' + userCode;

    var abort = false; //если ответ придёт после таймаута эта переменаня не даст вызвать коллбек 2й раз

    var abortTimer = setTimeout(function(){ //если не дождались ответа, отменяем
        abort = true;
        if(callback) callback('Превышен интервал ожидания');
    }, window.config.loadCaptchaTimeout);

    $.get(url, function( data ) {
        if(abort) return false; //слишком долго думал, уже не нужен.
        clearTimeout(abortTimer);

        if(data.indexOf('VIPFAIL') == 0) return callback('VIPFAIL');
        else if(data.indexOf('VIP') == 0) return callback('VIP');
        else if(data.indexOf('CHECK') == 0) return callback({key: data.substr(6)});
        else return callback(data);
    })
        .fail(function(jqXHR, textStatus) {
            if(abort) return false; //слишком долго думал, уже не нужен.
            clearTimeout(abortTimer);
            if(callback) callback(textStatus);
        });
}
function loadCaptcha() {
    //замена старой GetCaptcha()
    //запрашивает капчу и обновляет на странице
    $('.captcha-image').html('Загрузка...');

    requestCaptchaKey(function(data){
        if(!data.key) {
            if(data == 'VIP') {
                $('.captcha-box').html('Вам не нужно вводить капчу, у вас введен пасс-код.');
            }else if(data == 'VIPFAIL') {
                $('.captcha-box').html('Ваш пасс-код не действителен, пожалуйста, перелогиньтесь.');
            }else{
                $('.captcha-image').html(data);
            }
        }else{
            $('.captcha-image').html('<img src="//captcha.yandex.net/image?key=' + data.key + '">');
            $('.captcha-key').val(data.key);
            $('#captcha-value,#qr-captcha-value').val('');
        }
    });
}
function showQrForm(qr_box) {
    if(!qr_box) qr_box = $('#qr');
    if(Store.get('styling.qr.disable', false)) return;
    if(Store.get('styling.qr.disable_if_postform', false) && $('#postform').is(':visible')) return;

    qr_box.show();
    loadCaptcha();
}
function insert(myValue) {
    //переписанный insert
    var form = window.activeForm;
    var area = form[0];

    var qr_form = $('#qr-shampoo');
    var qr_area = qr_form[0];
    var qr_box = $('#qr');

    var win = $(window);

    if(!qr_box.is(':visible')) {
        if((win.width() >= 768 && win.height() >= 480) || !Store.get('mobile.hide_qr',true)) {
            showQrForm(qr_box);
        }
    }

    if (document.selection) { // IE
        qr_area.focus();
        var sel = document.selection.createRange();
        sel.text = myValue;
        qr_area.focus();
    } else if (area.selectionStart || area.selectionStart == '0') { // Real browsers
        var startPos = area.selectionStart;
        area.selectionStart = 0;
        //var scrollTop = area.scrollTop;
        //area.value = area.value.substring(0, startPos) + myValue + area.value.substring(endPos, area.value.length);
        qr_area.value = area.value.substring(0, startPos) + myValue + area.value.substring(startPos);
        qr_area.focus();
        qr_area.selectionStart = startPos + myValue.length;
        qr_area.selectionEnd = startPos + myValue.length;
        //area.scrollTop = scrollTop;
    } else {
        qr_area.value += myValue;
        qr_area.focus();
    }

    qr_form.keyup();
}
function getTimeInDays() {
    return Math.ceil((+new Date)/1000/60/60/24);
}
function renderStore() {
    $('#name').val(Store.get('thread.postform.name',''));

    var email = Store.get('thread.postform.email','');
    $('#qr-e-mail,#e-mail').val(email);
    $('#sagecheckbox').prop('checked', (email=='sage'));

    var watermark = !!Store.get('thread.postform.watermark',false);
    $('#makewatermark').prop('checked', watermark);

    var icon = Store.get('thread.postform.icon.' + window.thread.board, false);
    if(icon) $('.anoniconsselectlist').val(icon);

    if(!window.thread.id) return false;

    var autorefresh = !!Store.get('thread.autorefresh',false);
    var autorefresh_el = $('.autorefresh-checkbox');
    autorefresh_el.prop('checked', autorefresh);
    if(autorefresh) autorefresh_start();
}
function expandThread(tNum, callback) { //todo перенести в ООП наверное. А может и нет.
    var post = Post(tNum);
    var posts = post.threadPosts();
    var expanded_posts = $('#expanded-posts' + tNum);

    var proceed = function() {
        var tmp = Post(1);
        var elThread = $('#thread-' + tNum);
        var expanded_posts_el = $('<span id="expanded-posts' + tNum + '"></span>');
        var posts_el = elThread.find('.post-wrapper');
        var last_posts_count = posts_el.length;
        elThread.append(expanded_posts_el);

        for(var i=0;i<posts.length;i++) {
            tmp.num = posts[i];

            if(tmp.isThread()) continue;
            if(tmp.isNotFound()) continue;
            if(tmp.isRendered()) {
                expanded_posts_el.append( tmp.el() );
            }else{ //todo переписать этот пиздец на ООП
                var postshtml;

                postshtml = '<div id="post-' + tmp.num + '" class="post-wrapper">';
                postshtml += '<div class="reply post" id="post-body-' + tmp.num  + '" data-num="' + tmp.num  + '">';
                postshtml += generatePostBody(tmp.getJSON());
                postshtml += '</div>';
                postshtml += '</div>';

                expanded_posts_el.append( postshtml );
                Media.processLinks($('#post-' + tmp.num + ' a'));

                var te = tmp.raw();
                te.rendered = true;
            }
        }

        var last_posts = expanded_posts_el.find('.post-wrapper').slice(-last_posts_count);
        elThread.append(last_posts);

        elThread.find('.mess-post, .mess-post-mob').remove();
        if(callback) callback();
    };

    if(expanded_posts.length) return expanded_posts.toggle();
    if(!post.isThreadPreloaded()) {
        $alert('Загрузка...', 'wait');
        post.download(function(res){
            $close($id('ABU-alert-wait'));
            if(res.hasOwnProperty('errorText')) return $alert('Ошибка: ' + res.errorText);

            proceed();
        });
    }else{
        proceed();
    }
}
function scrollToPost(num) {
    //$('html, body').animate({ scrollTop: $('#post-' + num).offset().top }, 'slow');
    $(document).scrollTop($('#post-' + num).offset().top);
}
function escapeHTML(str) {
    return (str+'')
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function draggable_qr(id, pos) {
    //функция плавающих окон с записыванием их положения в хранилище
    var inDrag = false;
    var lastCursorX = 0;
    var lastCursorY = 0;
    var cursorInBoxPosX = 0;
    var cursorInBoxPosY = 0;

    var form = $('#' + id);
    var formX = 0;
    var formY = 0;

    var moveForm = function(x, y) {
        var win = $(window);
        var windowWidth = win.width();
        var windowHeight = win.height();
        var formWidth = form.innerWidth();
        var formHeight = form.innerHeight();

        if(x+formWidth > windowWidth) x = windowWidth-formWidth;
        if(y+formHeight > windowHeight) y = windowHeight-formHeight;
        if(x<0) x = 0;
        if(y<0) y = 0;


        form.css('top', y + 'px');
        form.css('left', x + 'px');

        formX = x;
        formY = y;
    };

    $('#' + id + '-header').mousedown(function(e){
        e.preventDefault();

        var win = $(window);
        lastCursorX = e.pageX - win.scrollLeft();
        lastCursorY = e.pageY - win.scrollTop();

        cursorInBoxPosX = lastCursorX-formX;
        cursorInBoxPosY = lastCursorY-formY;

        inDrag = true;
    });

    $(document).mousemove(function(e){
        if(!inDrag) return;
        var win = $(window);
        var mouseX = e.pageX - win.scrollLeft();
        var mouseY = e.pageY - win.scrollTop();
        lastCursorX = mouseX;
        lastCursorY = mouseY;

        moveForm(mouseX-cursorInBoxPosX, mouseY-cursorInBoxPosY);
    });

    $(document).mouseup(function(){
        if(!inDrag) return;

        Store.set('styling.' + id + '.x', formX);
        Store.set('styling.' + id + '.y', formY);

        inDrag = false;
    });

    $( window ).resize(function(){
        moveForm(formX, formY);
    });

    var win = $(window);

    //обернул для багфикса (иначе страница не успеет отрендериться)
    $(function(){
        var store_x = Store.get('styling.' + id + '.x', false);
        var store_y = Store.get('styling.' + id + '.y', false);

        if(typeof(store_x) == 'number' && typeof(store_y) == 'number') {
            moveForm(store_x, store_y);
        }else{
            if(pos == 'center') {
                moveForm((win.width()-form.width())/2, Math.floor(win.height()/3-form.height()/2));
            }else{
                moveForm(win.width()-form.width(), Math.floor(win.height()/3-form.height()/2));
            }

        }
    });
}
function draggable(el, events) {
    var in_drag = false;
    var moved = 0;
    var last_x, last_y;

    var win = $(window);

    el.mousedown(function(e){
        if(e.which != 1) return;
        if(events && events.mousedown && events.mousedown(e.clientX, e.clientY) === false) return;
        e.preventDefault();
        in_drag = true;
        moved = 0;

        last_x = e.clientX;
        last_y = e.clientY;
    });

    win.mousemove(function(e){
        var delta_x, delta_y;
        var el_top, el_left;

        if(!in_drag) return;

        delta_x = e.clientX-last_x;
        delta_y = e.clientY-last_y;
        moved += Math.abs(delta_x) + Math.abs(delta_y);

        last_x = e.clientX;
        last_y = e.clientY;

        el_top = parseInt(el.css('top'));
        el_left = parseInt(el.css('left'));

        el.css({
            top: (el_top+delta_y) + 'px',
            left: (el_left+delta_x) + 'px'
        });
    });

    win.mouseup(function(e) {
        if(!in_drag) return;
        in_drag = false;
        if(moved < 6 && events && events.click) events.click(last_x, last_y);
    });
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}