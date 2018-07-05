import logging
from json import loads, dumps
from time import time
from os.path import dirname
from os.path import join
from pkg_resources import get_distribution
from sanic import Sanic
from sanic.response import json, html, text

db_src = 'sqlite://'
app = Sanic()

with open(join(dirname(__file__), 'static', 'index.html')) as fd:
    index_html = fd.read()
    
with open(join(dirname(__file__), 'static', 'view.json')) as vd:
    view_json = loads(vd.read())

store = backend.Store(db_src)
logger = logging.getLogger(__name__)

@app.route('/output/<resource_id:int>')
async def output(request, resource_id):
    return json(store.query_resource(resource_id))

@app.route('/mapcore_june_demo.js')
async def serve_js(request):
    return text(bundle_js, headers={'Content-Type': 'application/javascript'})


@app.route('/static/view.json')
async def view(request):
    return json(view_json)

@app.route('/')
async def root(request):
    return html(index_html)


def main():
    app.run(host='0.0.0.0', port=8000)


if __name__ == '__main__':
    main()
