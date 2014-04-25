# -*- coding: utf-8 -*-
from tastypie.authorization import Authorization, ReadOnlyAuthorization
from tastypie.authorization import DjangoAuthorization
from tastypie import fields
from tastypie.resources import ModelResource

from models import *


class ListResource(ModelResource):
    tasks = fields.ToManyField('www.apps.task.api.TaskResource', 'tasks', full=True)
    
    def hydrate_tasks(self, bundle):
        bundle.tasks = []
        return bundle
    
    class Meta:
        authorization = DjangoAuthorization()
        queryset = List.objects.all()
        allowed_methods = ['post', 'get', 'patch', 'delete']
        resource_name = 'list'
        always_return_data = True


class TaskResource(ModelResource):
    list = fields.ToOneField(ListResource, 'list', full=False)
    class Meta:
        authorization = DjangoAuthorization()
        resource_name = 'task'
        queryset = Task.objects.all()
        allowed_methods = ['post', 'get', 'patch', 'delete']
        always_return_data = True
