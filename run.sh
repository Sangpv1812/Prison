#!/bin/bash
SCREEN='prison'
LOOPCMD='java -Xmx5000M -Xms5000M -XX:+UseG1GC -XX:MaxGCPauseMillis=50 -jar Prison.jar'
STOPCMD='stop'

function startServer() {
	if ! screen -list | grep -q $SCREEN; then
		echo "Booting $SCREEN!"
		cat > loop.sh <<LOOP_SCRIPT
while true; do
	if [ -f ".stop" ]; then
		rm -f .stop
		exit
	else
		$LOOPCMD
	fi
done
LOOP_SCRIPT
		chmod u+x loop.sh
		screen -L -dmS "$SCREEN" ./loop.sh
		viewServer
	else
		echo "$SCREEN already started!"
		exit 1
	fi
}

function stopServer() {
	if screen -list | grep -q $SCREEN; then
		touch .stop
		screen -S "$SCREEN" -X stuff "$STOPCMD
"
		rm -f loop.sh
	else
		echo "$SCREEN not yet started!"
		exit 1
	fi
}

function viewServer() {
	if screen -list | grep -q $SCREEN; then
		screen -x $SCREEN
	else
		echo "$SCREEN not yet started!"
		exit 1
	fi
}

case "$1" in
	start)
		startServer
		;;
	stop)
		stopServer
		;;
	view)
		viewServer
		;;
	restart)
		stopServer
		echo "Waiting 40 seconds for shutdown!"
		sleep 40s
		startServer
		;;
	*)
		echo "Usage: $0 start|stop|restart|view"
		exit 1
		;;
esac

exit 0
