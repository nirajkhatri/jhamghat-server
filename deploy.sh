echo "Switching to branch master"
git switch master


echo "Deploying file to server..."
rsync -av -e ssh --exclude='node_modules' ./* niraj@170.64.170.228:/jhamghatkhajaghar-server/

echo "Done!"

#chmod u+x deploy.sh

#  sudo systemctl restart nginx
# niraj@jhamghat:~$ sudo nginx -t