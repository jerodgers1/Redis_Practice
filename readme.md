# Start Server
  - start server by
 - cd Program Files\Redis
 - redis-server redis.windows.conf

# Redis CLI(command line interface)
- #### Basics
    In another command prompt
    ```redis-cli``` this will start the cli

    - type ```ping``` to get a response of ```pong``` that verifies your connected

- #### Commands
    - this will print the string to the terminal
    ```ECHO "something to print on screen" ```

     - this is called key/value pair where foo is the key and 100 is the value.
    ```SET foo 100```
    - This will return a string that looks like this: "100"
    ``` GET foo  ```
    - This will increment by 1 and return it as a integer so youll get (integer) 101
    ``` INCR foo ```
    - This will deincrement by 1 so it will return: (integer) 100
    ``` DECR foo ```
    - This will return 0 or 1 depending if the variable exists so the return will be: (integer) 1
    ```
        SET bar 1
        EXISTS bar
    ```
    - This will delete bar so it no longer exist then will return: (integer) 1
    ``` DEL bar ```
    - This is like a cache clear so if we type GET bar it will reply (nil) because it does exist anymore
    ``` FLUSHALL ```

  #### Setting objects
    ```
    SET james:height 67
    SET james:gender male
    set james:name "james rodgers"
    GET james:height //will reply with "67"
    GET james:gender //will reply with "male"
    EXPIRE james:height 60 //this will delete the height after 60 seconds
    TTL james:height // this will return how much time is left in seconds before it expires
      //after the value has expired
    TTL james:height //this will return -2
    GET james:height //this will return (nil)
      //if you reset the value then run ttl it will return -1 manying it will never expire until it is set to expire
      //same if you use ttl on any other var that hasnt been set to expired
    TTL james:gender //returns -1
# Run without starting CLI
    redis-cli ECHO Hello //this will print "Hello" without leaving the cli open

 #### Write Output to a File
    redis-cli INCR foo > Filename.txt //this will put 101 to a File

# Monitor
  - in one command prompt
     ```
      redis-cli
      INCR foo
      ```
- in one command prompt
     ```
      redis-cli
      monitor // this will monitor when you use then other command prompt
      //output will show the incr foo form the other terminal
