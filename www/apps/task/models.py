# -*- coding: utf-8 -*-
from django.db import models


class List(models.Model):
    name = models.CharField(u'Название', max_length = 128)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = u'Список'
        verbose_name_plural = u'Списки'
        ordering = ['-created']
        
        
class Task(models.Model):
    title = models.CharField('Описание', max_length = 255)
    list = models.ForeignKey(List, related_name = 'tasks')
    sub = models.ForeignKey('self', related_name = 'sub_tasks', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
    deadline = models.DateTimeField('Дедлайна', null=True, blank=True)
    plan_time = models.DateTimeField('Планируемое время', null=True, blank=True)
    is_close = models.BooleanField('Закрыта', default=False)
    
    class Meta:
        verbose_name = u'Задача'
        verbose_name_plural = u'Задачи'
        ordering = ['-created']
