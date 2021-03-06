__author__ = 'sachinpatney'

'''
    This runner will be launched very frequently,
    typically once per minute via an OS Cron Job.

    It will run all registered tasks each time,
    it is up to each task to use the time info
    and only run when required.

    For example the stock closing is only run at
    1:15 PM PST.

'''

import sys
import threading

from datetime import datetime
from time import sleep

# tasks
from vso import VSO
from jokes import Joker
from stock import StockTicker
from days_to_ga import DaysToGA
from weather import WeatherTask
from github import  Github

tasks = [VSO(), Joker(), StockTicker(), WeatherTask(), Github()]

time_info_list = datetime.now().strftime('%H,%M').split(',')

options = {'hour': time_info_list[0], 'min': time_info_list[1], 'simulate': False}

if len(sys.argv) >= 3:  # This is for testing the runner with a specific time
    options = {'hour': sys.argv[1], 'min': sys.argv[2], 'simulate': False}
if len(sys.argv) == 4:
    options['simulate'] = True

for task in tasks:
    threading.Thread(target=task.__run__,
                     args=(options,),
                     kwargs=None,
                     ).start()


sleep(45)  # give jobs 45 seconds to run
