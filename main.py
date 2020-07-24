from flask import Flask
import math
import flask_monitoringdashboard as dashboard
import psutil

app = Flask(__name__)
dashboard.bind(app)


def slow_function(n):
    result = 0

    i = pow(n, 7)
    while i >= 0:
        result += math.atan(i) * math.tan(i)
        i = i - 1


@app.route('/')
def hello_world():
    slow_function(9)

    return dict(dwdaw=True)


def cpu_usage(cpu=None):
    if cpu:
        cpu_percent = psutil.cpu_percent(percpu=True)[cpu]
        print(f'CPU #1: {cpu_percent}')

    else:
        cpu_percent = psutil.cpu_percent()
        print(f'CPU : {cpu_percent}')

    return cpu_percent


minute_schedule = {

}

dashboard.add_graph("CPU Utilization", cpu_usage, "cron", **minute_schedule)
# dashboard.add_graph("Utilization CPU #1", cpu_usage, "cron", **minute_schedule)
