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
    - this will only set a key if it doesnt already exists
    ``` SETNX foo "this will not work" ``` ```SETNX foo2 "this will work"```
    - This will return a string that looks like this: "100"
    ``` GET foo  ```
    - This will increment by 1 and return it as a integer so youll get (integer) 101
    ``` INCR foo ```
    - This will decrease by 1 so it will return: (integer) 100
    ``` DECR foo ```
    - This will increment by a specified amount
    ``` INCRBY foo 3 ```
    - This will decrease by a specified amount
    ``` DECRBY foo 3 ```
    - This will return old value then reset the value. i.e. return: 100 set: 200
    ``` GETSET foo 200 ```
    - This will return 0 or 1 depending if the variable exists so the return will be: (integer) 1
    ```
        SET bar 1
        EXISTS bar
    ```
    - This will delete bar so it no longer exist then will return: (integer) 1
    ``` DEL bar ```
    - This is like a cache clear so if we type GET bar it will reply (nil) because it does exist anymore
    ``` FLUSHALL ```

    - This will set multiple keys to respective values
    ``` MSET Dog1 "Hazel" Dog2 "Max" Dog3 "molly" ```

    - this will set multiple keys as long as none of the keys already exist, because dog1 already exist this command will not run, i.e. dog4 will never get set.
    ``` MSETNX Dog4 "billy" Dog1 "mike" ```

    - this will get multiple keys values. i.e. "Hazel" "Max"
    ``` MGET Dog1 Dog2 ```
    - this appends to an exisiing string, if the key does not exist it will work like a SET Command
    ``` APPEND Dog1 " the third" ```
    ``` APPEND Dog4 "billy" ```

    - this returns the substring of a string values. i.e. "Hazel the" will be returned
    ``` GETRANGE Dog1 0 8 ```
      - this will return the whole string. i.e. "Hazel the third"
      ``` GETRANGE Dog1 0 -1 ```

    - this will rename a key, note: if myRenamedKey exist it will be over written. if the myKey doesnt exist it will throw an error
    ``` RENAME myKey myRenamedKey ```
    - this will rename a key, only if the myRenamedKey doesnt exist, if it does it will throw an error
    ``` RENAMENX myKey myRenamedKey ```

    - this will set a key to hold a value and timeout after a given amount of seconds.
    ``` SETEX myKey 60 "Hello" ```
    Note: this is equivalent to
    ```
    SET mykey "Hello"
    EXPIRE mykey 60
    ```
    - This is the same as SETEX expect it uses milliseconds
    ``` PSETEX myKey 6000 "Hello" ```
    - This shows the remaining time in milliseconds
    ``` PTTL myKey ```
    - This will remove any timeout that has been set so a value doesnt expire
    ``` PERSIST myKey ```


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
