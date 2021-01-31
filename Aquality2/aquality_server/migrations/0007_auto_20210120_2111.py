# Generated by Django 3.1.3 on 2021-01-20 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aquality_server', '0006_data_arduino_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_account',
            name='bio',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='user_account',
            name='date_of_birth',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='user_account',
            name='occupation',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user_account',
            name='profile_pic',
            field=models.ImageField(null=True, upload_to='user-profile-pic'),
        ),
        migrations.AlterField(
            model_name='user_account',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='user_account',
            name='full_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user_account',
            name='user_group',
            field=models.CharField(max_length=200, null=True),
        ),
    ]