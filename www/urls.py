from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from www.apps.task.api import *

v1_api = Api(api_name='v1')
v1_api.register(ListResource())
v1_api.register(TaskResource())


urlpatterns = patterns('',
    url(r'^$', 'www.apps.task.views.index', name='home'),
    url(r'^accounts/login/$', 'www.apps.task.views.enter', name='enter'),
    url(r'^api/', include(v1_api.urls)),

    url(r'^admin/', include(admin.site.urls)),
)
