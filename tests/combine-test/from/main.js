gulp_place('{ "file": "body.js", "name": "MyModule", "type": "module", "depends": { "./Test": "ExternalModule" } }', "combine");
gulp_place('{ "glob": "namespace/*.*" }', "combine");