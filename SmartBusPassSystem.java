package projecrdsa;
import java.util.*;

class User {
    String username;
    String password;
    String role;

    User(String u, String p, String r) {
        username = u;
        password = p;
        role = r;
    }
}

class BusPass {
    String id;
    String name;
    String roll;
    String route;
    int fare;

    BusPass(String id, String name, String roll, String route, int fare) {
        this.id = id;
        this.name = name;
        this.roll = roll;
        this.route = route;
        this.fare = fare;
    }

    void display() {
        System.out.println("\n--- Bus Pass ---");
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Roll: " + roll);
        System.out.println("Route: " + route);
        System.out.println("Fare: ₹" + fare);
    }
}

public class SmartBusPassSystem {

    static ArrayList<User> users = new ArrayList<>();
    static ArrayList<BusPass> passes = new ArrayList<>();

    static Scanner sc = new Scanner(System.in);
    static User currentUser = null;

    public static void main(String[] args) {

        users.add(new User("admin", "admin", "admin"));

        while (true) {

            System.out.println("\nSMART BUS PASS SYSTEM");
            System.out.println("1. Login");
            System.out.println("2. Register");
            System.out.println("3. Exit");

            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    login();
                    break;

                case 2:
                    register();
                    break;

                case 3:
                    System.exit(0);
            }
        }
    }

    static void register() {

        System.out.print("Enter username: ");
        String u = sc.next();

        System.out.print("Enter password: ");
        String p = sc.next();

        users.add(new User(u, p, "student"));

        System.out.println("Registered Successfully");
    }

    static void login() {

        System.out.print("Username: ");
        String u = sc.next();

        System.out.print("Password: ");
        String p = sc.next();

        for (User user : users) {
            if (user.username.equals(u) && user.password.equals(p)) {
                currentUser = user;
                dashboard();
                return;
            }
        }

        System.out.println("Invalid Login");
    }

    static void dashboard() {

        while (true) {

            System.out.println("\nDASHBOARD");
            System.out.println("1. Generate Pass");
            System.out.println("2. View Pass");
            System.out.println("3. Logout");

            if (currentUser.role.equals("admin")) {
                System.out.println("4. Admin Dashboard");
            }

            int ch = sc.nextInt();

            if (ch == 1)
                createPass();
            else if (ch == 2)
                viewPass();
            else if (ch == 3)
                return;
            else if (ch == 4 && currentUser.role.equals("admin"))
                adminPanel();
        }
    }

    static void createPass() {

        sc.nextLine();

        System.out.print("Student Name: ");
        String name = sc.nextLine();

        System.out.print("Roll Number: ");
        String roll = sc.nextLine();

        System.out.print("Route: ");
        String route = sc.nextLine();

        System.out.print("Fare: ");
        int fare = sc.nextInt();

        String id = "BP" + (System.currentTimeMillis() % 100000);

        BusPass pass = new BusPass(id, name, roll, route, fare);

        passes.add(pass);

        System.out.println("Pass Generated with ID: " + id);
    }

    static void viewPass() {

        System.out.print("Enter Pass ID: ");
        String id = sc.next();

        for (BusPass p : passes) {

            if (p.id.equals(id)) {
                p.display();
                return;
            }
        }

        System.out.println("Pass not found");
    }

    static void adminPanel() {

        while (true) {

            System.out.println("\nADMIN DASHBOARD");
            System.out.println("1. View All Passes");
            System.out.println("2. Verify Pass");
            System.out.println("3. Back");

            int ch = sc.nextInt();

            if (ch == 1) {

                for (BusPass p : passes) {
                    p.display();
                }

            } else if (ch == 2) {

                System.out.print("Enter Pass ID: ");
                String id = sc.next();

                for (BusPass p : passes) {
                    if (p.id.equals(id)) {
                        System.out.println("Valid Pass: " + p.name);
                        return;
                    }
                }

                System.out.println("Invalid Pass");

            } else if (ch == 3) {
                return;
            }
        }
    }
}