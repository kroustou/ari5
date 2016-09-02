var webpack = require("webpack");

module.exports = {
	entry: './js/app/index.js',
	output: {
		path: __dirname + '/js',
		filename: 'index.js',
		publicPath: '/js/'
	},
	devServer: {
		inline: true,
		port: 8001
	},
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
	module: {
		loaders: [
		    {
		      test: /\.js$/,
		      exclude: /(node_modules|bower_components)/,
		      loader: 'babel',
		      query: {
		        presets: ['es2015', 'react']
		      }
		    },
		     {
	            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
	            loader: "imports?this=>window"
	        },
	        {
	            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
	            loader: "imports?define=>false"
	        },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
		]
	}
}
