:: Install packages
echo "INSTALLING GLOBAL PACKAGES . . . " && npm i -g typescript@latest && npm i -g forever@latest && echo "INSTALLING LOCAL PACKAGES . . . " && npm i && echo "RUNNING TypeScript COMPILER" && tsc
