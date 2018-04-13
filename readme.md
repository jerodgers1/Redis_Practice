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

    - Scan
    ``` MSET item1 "1" item2 "2" item3 "3" item4 "4" item5 "5" item6 "6" item7 "7" item8 "8" item9 "9" item10 "10" item11 "11" item12 "12" item13 "13" item14 "14" item15 "15" item16 "16" ```
      - this will return the first ten keys and a cursor to get the rest
    ```SCAN 0```
      - this will return the rest of the keys
    ```SCAN 16 ```
      - this will return the first 4 from the then
    ```SCAN 0 COUNT 4```
      - this will return all keys
    ```KEYS *```
      - this will scan for patterns and return all keys that match the pattern
    ```KEYS item1*```
      -this will return a random keys
    ```RANDOMKEY```

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

# CONFIG GET
  - you can use this to get information about the configuration

# CONFIG SET
  - this is used to reconfigure the server at runtime without having to do a restart
  ```CONFIG SET configoption "newvalue"```

  - INFO returns information and stats about a server. it has optional parameters to select specific section of information.
    - parameters: server, clients, memory, persistence, stats, replication, cpu, commandstats, cluster, keyspace, all, default.
  ```INFO <parameters>```

  - CONFIG RESETSTAT this will reset the stats reported using the INFO command
  ```CONFIG RESETSTAT```

  - COMMAND this will return a list of command in the Server
  ```COMMANDS```

  -CLIENT SETNAME sets the client name
  ```CLIENT SETNAME james```

  -CLIENT GETNAME returns the names of the clients.

# client list
  -this will return the info and stats on the clients connected to a server.
  ```CLIENT LIST```

# Data types
  - lists, sets, sorted sets, hashes
  ### list  
      - a list are basically groups of strings
      -sorted by insertion orders
      - elements can be pushed on the head or tail
      - often used as producer/consumer queries
    ##### Inserting elements
    - LPUSH inserts a new element on the head(left)
    ```LPUSH mylist a``` //here mylist is being created and a is push to the lists
    ```LPUSH mylist b``` //here b is added to mylist so the list is "b", "a"
    - RPUSH inserts a new element on thetail (right)
    ```RPUSH mylist c``` //here c is added. list is "b", "a", "c"

    note: a new list is created when LPUSH or RPUSH is ran against a empty key. the key is removed from the keyspace if a list operation will empty the list.

    #### Getting element from a lists
    - LRANGE return specifed elements of the lists
    ```LRANGE mylist 0 -1```
    returns
    1) "b"
    2) "a"
    3) "c"
    ```LRANGE mylist 0 2```
    returns
    1) "b"
    2) "a"
    3) "c"
    ```LRANGE mylist 0 1```
    returns
    1) "b"
    2) "a"

    - LLEN returns the length of the lists
    ```LLEN mylist```
    returns: (integer) 3

    -LPOP will remove and return the last element of the list on the head or left
    -RPOP will remove and return the last element of the list on the tail or right

    -LINSERT will insert value into a list.
    ```LINSERT mylist BEFORE "c" "d"```
    this will add d to list so mylist will = b, a, d, c

    -LINSERT will insert value into a list.
    ```LINSERT mylist AFTER "c" "e"```
    this will add e to list so mylist will = b, a, e, d, c

  ### SETS
    -sets are unordered collection of strings
    -can add, remove and test for existence
    -do not allow repeating members
    -support server side commands to compute sets starting from existing SETS. this allows us to perform unions, intersections, differences.  

    - SADD adds given values to a set, note: values that already exist will be ignored.
      ```SADD carmakes "Toyota" //adds Toyota to carmakes set```

    - SREM removes values from a set
      ```SREM carmakes "Honda" //Removes honda from carmakes set```

    - SISMEMBER this test if the given value is in the set, it returns 1 if teh value is there otherwise 0.
      ```SISMEMBER carmakes "Toyota"```

    - SMEMBERS returns a list of all the members of a set
      ```SMEMBERS carmakes```

    - SCARD returns the count of members/ elements in a set, if set does not exist it returns 0.
      ```SCARD carmakes```

    - SMOVE moves member from one set to another
      ```SMOVE applicate employee "John Doe" //moves john does from applicate to employee.```

    - SUNION combines two or more sets and returns a list of members.
      ```SUNION carmakes truckmakes```

    - SDIFF returns the members of the set reulting from the difference between the first and all successive sets. keys that do not exist are considered empty SETs.
      ```SDIFF users caliUsers newYorkUsers /// return all user that are in the cali or newyour user set ```

    - SRANDMEMBER returns a random member of a set. optional parameter to return a specified count.
      ```SRANDMEMBER carmakes //returns a random member
         SRANDMEMBER carmakes 3 //returns 3 random members ```

  ### Sorted SETS
    - Every member is associated with a "score"
    - can access data very quickly since its Sorted
    - like sets, elements may only appear once.

    - Sore Properties
        - score is required
        - must be a float/number
        - score of 500 = 500.0
        - score is not unique so you can have two member with the same score, but values are.

    - ZADD adds given values to a sorted sets
    ```ZADD people 1960 "john doe" //1960 is the score ```

    - ZREM removes values from a sorted set
    ```ZREM people "john doe"```

    - ZRANGE works like lrange for list. it fetches values within a specifies range. ordered lowest to hieghtest by score.
    ```ZRANGE people 0 -1```

    - ZREVRANCE same as ZRANGE except ordered highest to lowest.
    ```ZREVRANCE people 0 -1```

    - ZRANGEBYSCORE works like zrange but uses a range of score values
    ```ZRANGEBYSCORE people 1950 1990 // returns members with a score between 1950 and 1990```

    - ZRANK returns the rank of a member with scores ordered from high to low
    ```ZRANk people "john doe"```

    - ZREVRANK return the rank of a member in the reverse order.
    ```ZREVRANK people "john doe"```

    - ZCARD returns the number of members in the sorted set.
    ```ZCARD people```

    - ZCOUNT return the number of elements in the sorted set at key with a score between min and max.
    ```ZCOUNT people(1,3)```

    - ZINCRBY
      - this will increment the score of member in the sorted set
      - if member does not exist, it will be added with increment as its score.
      - the score value should be the string representation of a numeric value, and accepts double precision floating point numbers. it is possible to provide a negative value to decrement the score.
      ```ZINCRBY people 1 "john doe" //so john doe score does to 1961```

    - ZSCORE returns the score of a member
      ```ZSCORE people "john doe" //this will return 1961```

  ### Hash
    - maps between string fields and string values
    - perfect for representing objects
    - very compact

    - HSET sets a field in the hash, if a key does not exist a new key holding a hash is created, if the field exists in the hash, it is overwritten.
    ```HSET user1 name "john" // 1 is return if field is a new field in the hash and value was set successfully. 0 is return if the field already exist in the hash and the value was overwritten```

    - HMSET sets multiple fields to their respective values, overwrite any existing fields in the hash.
      ``` HMSET user2 name "jill" email "jill@gmail.com" age "25" ```

    - HGET gets a value associated with a field in a hash. returns value or nil if the field is not present.
    ```HGET user1 name```

    - HMGET gets a values associated with a multiple fields in a hash. returns value or nil if the field is not present.
    ```HMGET user1 name age```

    - HGETALL returns all fields and values in a hash.
    ```HGETALL users```

    - HDEL removes the specified fields from a hashes
    ```HDEL user2 age```

    - HINCRBY increments the number sorted in the hash,
    ```HINCRBY user3 age 1```

    - HKEYS returns all field names in the hash
    ```HKEYS user1 //note the values just name```

    - HLEN returns the number of fields contained in the hash,
    ```HLEN user1```

    -HVALS returns all the values in a hash but not the key name.
    ```HVALS user1 ```

    -HSTRLEN returns the string length of the value associated with the field in the hash.
    ```HSTRLEN user1 name```

### Data Persistence
  - Datasets are all stored in memory
  - Datasets can be saved to disk, also called persistence data.
  - Redis fork - Creating child processes which are an exact copy of the parent
  - Copy-On-Write Snapshot

  ##### Persistence Process (Generalized)
    1) client sends write command to database (client memory)
    2) Database receives the write (Server memory)
    3) Database calls system call that writes data on disk (Kernel buffer) (final stage is no data persistence is set up)
    4) The OS transfers the write buffer to the disk controller (Disk Cache)
    5) Disk controller writes to physical media (Physical Disk)

  ### Pools
    - a pool is where you can have multiple redis servers running on the same machine using different ports.
      this gives us added benefits.
      - efficient memory usage
      - more CPUs
      - Better fine-tuning.

  ### Replication
    - simple master-slave replication allows slave redis servers to be copies of master servers.
      the benefits of this are:
      - Asynchronous Replication
      - multiple slaves
      - Connection from other slaves
      - non blocking on slave side
      - Scalability & data redundancy
      - slave read-only

    ##### Replication Process
    1) Master starts saving in the background and starts buffering all new commands that will modify the dataset.
    2) After background saving, the master transfers the database file to the slave.
    3) the slave saves the files to the disk and loads it into memory
    4) the master sends all buffered commands to the slave.

  ### RDB - Redis Database File
    - simplest persistence mode
    - enable by default
    - single-file point-in-time representation
    - uses snapshots.

    ##### RDB Advantages
    - easy to use
    - very compact
    - perfect for backup and recovery
    - maximizes redis performace
    - allows faster restarts with big datasets compared to AOF

    ##### RDB Disadvantages
    - limited to save points, another words lets say the data sets are saved every 15 minutes, if there is some type of issue you could lose up to 15 mins of writes.
    - not good if you want to minimize the change of data loss if redis stops working
    - needs to fork() often which can be time consuming and can wear on CPU performance.

  ### Snapshotting
    - Controlled by the user
    - Can be modified at runtime
    - Snapshots are produced as .rbd files.
    - SAVE & BGSAVE Commands.

    ##### Save & BGSave
      - `Save` performs a synchronous save of the dataset producing a point-in-time snapshot of all data inside of the Redis instance in the form of an .rdb file. Should not be called in production environments as it will block all other clients. Instead, use BGSave.
      - `SAVE 60 100` dump dataset to disk every 60 seconds if at least 1000 keys changed
      - `BGSAVE` saves the DB in the background and the parent continues to serve clients.

  ### AOF - Append Only File
    - Main persistence option.
    - how it works every operation gets logged.
    - log is the same formate used by clients.
    - can be piped to another instance .
    - dataset can be reconstructed.

    ##### AOF Rewrite
      - used when AOF file gets too big.
      - Rewrite database from scratch.
      - directly access data in memory.
      - no need for disk access.
      - once written, then temp file is synched on to disk using fsync.

    ##### fsync Policies
      - No fsync - Done by OS, usually every 30 seconds or so.
      - fsync every second (default)
      - fsync at every query (slow)

    ##### AOF Advantage
      - much more durable
      - single file with no corruption
      - automatically rewrites in the background if it gets too big
      - easy to understand log / instructions.

    ##### AOF Disadvantages
      - Takes longer to load in memory on server restarts
      - usually bigger than th equivalent RDB Files
      - can be slower than RDB depending on the fsync policy
      - more possible bugs

# RDB and AOF in Action
  ran into error on lecture 23

# Node.js and redis
  to start use node app
  make sure redis server is open. from lecture 26
