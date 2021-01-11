package net.rudikone.springbootsecurity.controllers.restcontrollers;


import net.rudikone.springbootsecurity.model.Role;
import net.rudikone.springbootsecurity.model.User;
import net.rudikone.springbootsecurity.service.RoleService;
import net.rudikone.springbootsecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminRestController {

    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //старое рабочее
//    @PostMapping("/users/create")
//    public List<User> addNewUser(@RequestBody User user) {
//        userService.save(user);
//        return userService.getAllUsers();
//    }

    @PostMapping("/users/create")
    public ResponseEntity<List<User>> addNewUser(@RequestBody User user) {
        userService.save(user);
        List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.findAll();
        return roles != null && !roles.isEmpty()
                ? new ResponseEntity<>(roles, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //старое рабочее
//    @DeleteMapping("/users/{id}")
//    public List<User> deleteUsers(@PathVariable Long id) {
//        userService.delete(id);
//        return userService.getAllUsers();
//    }

    //старое рабочее
//    @DeleteMapping("/users/{id}")
//    public List<User> deleteUsers(@PathVariable Long id) {
//        userService.delete(id);
//        return userService.getAllUsers();
//    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<List<User>> deleteUsers(@PathVariable Long id) {
        userService.delete(id);
        List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/users/info")
    public ResponseEntity<User> getUser(Principal principal) {
        String email = principal.getName();
        User user = userService.getUserByEmail(email);
        return user !=null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.show(id);
        return user !=null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//старое рабочее
//    @GetMapping("/roles/{id}")
//    public Role getRoleById(@PathVariable Integer id) {
//        return roleService.findRoleById(id);
//    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Integer id) {
        Role role = roleService.findRoleById(id);
        System.out.println(role);
        return role !=null
                ? new ResponseEntity<>(role, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
