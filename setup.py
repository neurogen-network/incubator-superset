# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import json
import os
import subprocess

from setuptools import find_packages, setup

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PACKAGE_DIR = os.path.join(BASE_DIR, 'superset', 'static', 'assets')
PACKAGE_FILE = os.path.join(PACKAGE_DIR, 'package.json')
with open(PACKAGE_FILE) as package_file:
    version_string = json.load(package_file)['version']


def get_git_sha():
    try:
        s = str(subprocess.check_output(['git', 'rev-parse', 'HEAD']))
        return s.strip()
    except Exception:
        return ''


GIT_SHA = get_git_sha()
version_info = {
    'GIT_SHA': GIT_SHA,
    'version': version_string,
}
print('-==-' * 15)
print('VERSION: ' + version_string)
print('GIT SHA: ' + GIT_SHA)
print('-==-' * 15)

with open(os.path.join(PACKAGE_DIR, 'version_info.json'), 'w') as version_file:
    json.dump(version_info, version_file)


setup(
    name='ngn-superset',
    description=(
        'A interactive data visualization platform build on SqlAlchemy '
        'and druid.io'),
    version='0.0.1',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    scripts=['superset/bin/superset'],
    install_requires=[
        'bleach',
        'boto3>=1.4.6',
        'celery>=4.1.1',
        'colorama',
        'contextlib2',
        'cryptography',
        'flask<1.0.0',
        'flask-appbuilder==1.10.0',  # known db migration with 1.11+
        'flask-caching',
        'flask-compress',
        'flask-migrate',
        'flask-script',
        'flask-testing',
        'flask-wtf',
        'flower',  # deprecated
        'future>=0.16.0, <0.17',
        'geopy',
        'gunicorn',  # deprecated
        'humanize',
        'idna',
        'markdown',
        'pandas',
        'parsedatetime',
        'pathlib2',
        'polyline',
        'pydruid>=0.4.3',
        'pyhive>=0.4.0',
        'python-dateutil',
        'python-geohash',
        'pyyaml>=3.11',
        'requests',
        'simplejson',
        'six',
        'sqlalchemy',
        'sqlalchemy-utils',
        'sqlparse',
        'thrift>=0.9.3',
        'thrift-sasl>=0.2.1',
        'unicodecsv',
        'unidecode>=0.04.21',
        'flask-jwt-extended==3.7.2',
    ],
    extras_require={
        'cors': ['flask-cors>=2.0.0'],
        'console_log': ['console_log==0.2.10'],
    },
    author='test',
    author_email='test@test.com',
    url='',
    download_url='',
    classifiers=[
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
)
