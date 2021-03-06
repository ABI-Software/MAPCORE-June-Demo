from setuptools import setup
from setuptools import find_packages

version = '0.0.1'

classifiers = """
Development Status :: 3 - Alpha
Intended Audience :: Developers
Operating System :: OS Independent
Programming Language :: JavaScript
Programming Language :: Python :: 3
Programming Language :: Python :: 3.5
Programming Language :: Python :: 3.6
""".strip().splitlines()

package_json = {
    "dependencies": {
        "physiomeportal": "0.2.0alpha",
        "open-physiology-viewer": "0.1.0"
    },
    "devDependencies": {
        "file-loader": "^1.1.11",
        "html-loader": "^0.5.5",
        "raw-loader": "^0.5.1",
        "style-loader": "^0.21.0",
        "uglifyjs-webpack-plugin": "^1.2.5",
        "url-loader": "^1.0.1",
        "webpack": "^4.6.0",
        "webpack-cli": "^2.1.2",
        "webpack-jquery-ui": "^1.0.0"
    }
}

setup(
    name='mapcore_june_webdemo',
    version=version,
    description='MAPCORE web demo for June',
    long_description=open('README.md').read(),
    classifiers=classifiers,
    keywords='',
    author='Auckland Bioengineering Institute',
    url='https://github.com/ABI-Software/MAPCORE-June-Demo',
    packages=find_packages('src', exclude=['ez_setup']),
    package_dir={'': 'src'},
    namespace_packages=[],
    zip_safe=False,
    install_requires=[
        'setuptools>=12',
        'sqlalchemy>=0.9',
        'sanic',
    ],
    extras_require={
        'webpack': [
            'calmjs.webpack>=1.0.2',
        ],
        'sass': [
            'calmjs.sassy[libsass]>=1.0.0,<2',
        ],
    },
    extras_calmjs={
        'node_modules': {
            'physiomeportal': 'physiomeportal/build/physiomeportal.js',
            'open-physiology-viewer': 'open-physiology-viewer/dist/open-physiology-viewer.js',
        },
    },
    package_json=package_json,
    calmjs_module_registry=['calmjs.module'],
    calmjs_scss_module_registry=['calmjs.scss'],
    include_package_data=True,
    python_requires='>=3.5',
    build_calmjs_artifacts=True,
    entry_points={
        'console_scripts': [
            'mapcore_june_webdemo = mapcore_june_webdemo.app:main',
        ],
        'calmjs.module': [
            'mapcore_june_webdemo = mapcore_june_webdemo',
        ],
        'calmjs.scss': [
            'mapcore_june_webdemo = mapcore_june_webdemo',
        ],
        'calmjs.artifacts': [
            'bundle.js = calmjs.webpack.artifact:complete_webpack',
            'bundle.min.js = calmjs.webpack.artifact:optimize_webpack',
            'bundle.css = calmjs.sassy.artifact:complete_css',
            'bundle.min.css = calmjs.sassy.artifact:complete_compressed_css',
        ],
    },
    # test_suite="",
)
