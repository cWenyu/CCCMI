# Generated by Django 3.1.5 on 2021-04-06 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aquality_server', '0031_useraccount_first_time_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='first_time_login',
            field=models.BooleanField(default=True),
        ),
    ]