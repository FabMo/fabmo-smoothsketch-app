fabmo-smoothsketch-app.fma: clean *.html css/* js/*.js js/libs/*.js icon.png package.json
	zip fabmo-smoothsketch-app.fma *.html css/* js/*.js js/libs/*.js icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-smoothsketch-app.fma
