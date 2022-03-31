# Generated by Django 3.2.4 on 2022-03-11 17:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20220311_1708'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='number_likes',
            field=models.IntegerField(default=0),
        ),
        migrations.RemoveField(
            model_name='posts',
            name='poster',
        ),
        migrations.AddField(
            model_name='posts',
            name='poster',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='poster', to='network.user'),
            preserve_default=False,
        ),
    ]