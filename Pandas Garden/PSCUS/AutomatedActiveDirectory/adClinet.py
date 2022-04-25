import rpyc

connect = rpyc.connect("localhost",19961)
connect.root.run_command("whoami")